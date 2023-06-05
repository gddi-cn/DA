import { GddiChat, Chat } from "./types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ControllerPool, loadingAtom, messageListAtom, openAtom, propsAtom, renderMessageListAtom, userInputAtom } from "./store";
import React from "react";
import { createMessage } from "./utils";
import { ChatMessageListRef } from "./ChatMessageList";

export const requestChatStream = async (
  messages: Chat.Message[],
  url: string,
  onMessage: (content: string, done: boolean) => void,
  onError?: (error: Error, statusCode?: number) => void,
  onController?: (controller: AbortController) => void,
  headers?: Record<string, string>,
  timeout = 6e4,
) => {
  const sendMessages = messages.map(({ content, role }) => ({ content, role }))

  const controller = new AbortController()
  const reqTimeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
        body: JSON.stringify({
          messages: sendMessages,
          model: "gpt-3.5-turbo",
          presence_penalty: 0,
          stream: true,
          temperature: 0.5
        }),
        signal: controller.signal,
      }
    )
    clearTimeout(reqTimeoutId)

    let responseText = ""

    const finish = () => {
      onMessage(responseText, true)
    }

    if (res.ok) {
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      onController && onController(controller)

      while (true) {
        const resTimeoutId = setTimeout(() => finish(), timeout)
        const content = await reader?.read()
        clearTimeout(resTimeoutId)

        if (!content || !content.value) break

        const text = decoder.decode(content.value, { stream: true })
        responseText += text

        const done = content.done

        onMessage(responseText, false)

        if (done) break
      }
      finish()
    } else if (res.status === 401) {
      console.error("[Unauthorized]")
      onError && onError(new Error("Unauthorized"), res.status)
    } else {
      console.error("[Stream] Failed to request chat stream")
      onError && onError(new Error("Stream Error"), res.status)
    }


  } catch (error) {
    console.error("[NETWORK] Failed to request chat stream", error)
    onError && onError(error as Error)
  }
}

const useInitChat = (props: GddiChat.Props) => {
  const { greeting = '有什么可以帮到你的吗？', modelType = 'gpt-3.5-turbo', ...res } = props

  const setProps = useSetAtom(propsAtom)
  const setMessageList = useSetAtom(messageListAtom)

  React.useEffect(
    () => {
      setProps({ ...res, modelType, greeting })
      setMessageList([
        createMessage({ role: 'assistant', content: greeting }),
      ])
    },
    []
  )

}
const useUserInputSubmit = () => {
  const props = useAtomValue(propsAtom)

  const [messageList, setMessageList] = useAtom(messageListAtom)
  let timerId: ReturnType<typeof setTimeout> | undefined

  return async (content: string) => {

    if (!props) return

    const {
      chatStreamURL,
      timeout,
      messageThreshold = 4,
      getHeaders,
      modelType: model,
      ratingTimeout = 5,
    } = props

    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(
      () => {
        setMessageList(old => {
          if (old[old.length - 1].gType === 'rating') return old
          return [...old, createMessage({ role: 'assistant', gType: 'rating' })]
        })
      },
      ratingTimeout * 60 * 1e3
    )

    const userMessage: Chat.Message = createMessage({ role: 'user', content })
    const botMessage: Chat.Message = createMessage({ role: 'assistant', id: userMessage.id! + 1, model })
    const systemInfo = createMessage({
      role: "system",
      content: `IMPRTANT: You are a virtual assistant powered by the ${model
        } model, now time is ${new Date().toLocaleString()}`,
      id: botMessage.id! + 1,
    })

    const systemMessage = [systemInfo]
    const recentMessage = messageList.filter(x => !x.gType).slice(messageList.length - messageThreshold)

    const sendMessages = systemMessage.concat(
      recentMessage.concat(userMessage)
    )

    setMessageList(old => [...old, userMessage, botMessage])

    const headers = getHeaders && getHeaders()

    const updateMessage = (messageId: Chat.Message['id'], values: Partial<Chat.Message>) => {
      setMessageList(old => {
        const idx = old.findIndex(({ id }) => id === messageId)
        if (idx === -1) return old
        const newMessageList = [...old]
        newMessageList[idx] = { ...old[idx], ...values }
        return newMessageList
      })
    }

    requestChatStream(
      sendMessages,
      chatStreamURL,
      (content, done) => {
        if (done) {
          updateMessage(botMessage.id!, { content, streaming: false })
          ControllerPool.remove(botMessage.id!)
        } else {
          updateMessage(botMessage.id!, { content, streaming: true })
        }
      },
      () => {
        updateMessage(botMessage.id!, { streaming: false, isError: true })
        updateMessage(userMessage.id!, { isError: true })
        ControllerPool.remove(botMessage.id!)
      },
      (controller) => {
        ControllerPool.addController(botMessage.id!, controller)
      },
      headers,
      timeout,
    )
  }
}

const useDeleteMsg = () => {
  const [messageList, setMessageList] = useAtom(messageListAtom)

  return (message: Chat.Message) => {
    const botMsgIdx = messageList.findIndex(({ id }) => id === message.id)
    if (botMsgIdx <= 0) return false

    const newList = [...messageList]
    const [userMessage] = newList.splice(botMsgIdx - 1, 2)

    setMessageList(newList)
    return userMessage
  }
}

const useReSend = () => {
  const deleteMsg = useDeleteMsg()
  const handleSubmit = useUserInputSubmit()
  const setLoading = useSetAtom(loadingAtom)

  return (message: Chat.Message) => {
    const userMsg = deleteMsg(message)
    if (!userMsg) return
    setLoading(true)
    handleSubmit(userMsg.content).then(() => setLoading(false))
  }
}

const useStopMsg = () => {
  return (message: Chat.Message) => {
    if (!message.id) return

    ControllerPool.stop(message.id)
  }
}

const getScore = (value: number): string | undefined => {
  switch (value) {
    case 1:
      return '不满意'
    case 2:
      return '一般'
    case 3:
      return '满意'
    case 4:
      return '非常满意'
    default:
      return undefined
  }
}

export const useGddiChat = (props: GddiChat.Props) => {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useAtom(openAtom)
  const ratingTimeout = props.ratingTimeout ?? 5
  useInitChat({ ...props, ratingTimeout })
  const userInputSubmit = useUserInputSubmit()
  const _props = useAtomValue(propsAtom)
  const {
    getHeaders,
  } = _props || {}

  const [userInput, setUserInput] = useAtom(userInputAtom)
  const messageList = useAtomValue(renderMessageListAtom)
  // const messageList = useAtomValue(messageListAtom)
  const setLoading = useSetAtom(loadingAtom)

  const listRef = React.useRef<ChatMessageListRef>(null)

  const handleInputChange: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    setUserInput(e.currentTarget.value)
  }

  const handleDelete = useDeleteMsg()
  const handleResend = useReSend()
  const handleStop = useStopMsg()

  const handleSubmit = () => {
    if (userInput.trim() === '') return
    setLoading(true)
    userInputSubmit(userInput).then(() => setLoading(false))
    setUserInput('')
    listRef.current?.setAutoScroll(true)
  }

  const handleClick = () => {
    setOpen(o => !o)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRating = (value: number) => {
    const { ratingURL } = props
    const score = getScore(value)

    const headers = getHeaders && getHeaders()

    if (!score || !ratingURL) return

    fetch(ratingURL + '?' + new URLSearchParams({ score }), {
      method: 'POST',
      headers,
    })
  }

  React.useEffect(
    () => {
      if (open) {
        setTimeout(() => {
          listRef.current?.scrollToBottom()
        })
      }
    },
    [open]
  )

  return {
    btnRef,
    messageList,
    userInput,
    handleInputChange,
    handleSubmit,
    listRef,
    handleResend,
    handleDelete,
    ratingTimeout,
    handleStop,
    open,
    handleClick,
    handleClose,
    handleRating,
  }
}
