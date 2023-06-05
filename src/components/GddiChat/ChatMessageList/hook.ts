import React from "react"
import { ChatMessageListProps, ChatMessageListRef } from "./types"

export const useChatMessageList = (
  props: ChatMessageListProps,
  ref: React.ForwardedRef<ChatMessageListRef>
) => {
  const {
    messageList,
    onMouseDown,
    hitBottom,
    onScroll,
    onUserStopMessage,
    onDeleteMessage,
    onRetryMessage,
    onDoubleClickMessage,
    messageBgColor,
    messageNoBorder,
    systemAvatar,
    userAvatar,
    timeout = 5,
    onRating: _onRating,
  } = props

  const scrollRef = React.useRef<HTMLDivElement>(null)

  const [autoScroll, setAutoScroll] = React.useState<boolean>(false)

  const scrollToBottom = () => {
    const dom = scrollRef.current
    if (!dom) return

    setTimeout(() => {
      dom.scrollTop = dom.scrollHeight
    });
  }

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    setAutoScroll(!!hitBottom && e.deltaY > 0)
  }

  const onRating = (value: number) => {
    _onRating(value)
    scrollToBottom()
  }

  React.useImperativeHandle(ref, () => ({
    hitBottom,
    scrollRef,
    scrollToBottom,
    setAutoScroll,
  }))

  React.useLayoutEffect(() => {
    autoScroll && scrollToBottom()
  })

  return {
    scrollRef,
    messageList,
    onWheel,
    onScroll,
    onMouseDown,
    onUserStopMessage,
    onDeleteMessage,
    onRetryMessage,
    onDoubleClickMessage,
    messageBgColor: messageBgColor as string | undefined,
    messageNoBorder,
    systemAvatar,
    userAvatar,
    timeout,
    onRating,
  }
}
