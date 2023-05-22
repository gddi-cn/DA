import { atom } from 'jotai'
import { createMessage } from './utils'
import { GddiChat, Chat } from './types'

export const ControllerPool = {
  controllers: {} as Record<number, AbortController>,

  addController(messageId: number, contgroller: AbortController) {
    this.controllers[messageId] = contgroller
  },

  stop(messageId: number) {
    const controller = this.controllers[messageId]
    controller?.abort()
  },

  remove(messageId: number) {
    delete this.controllers[messageId]
  }
}

export const messageListAtom = atom<Array<Chat.RenderMessage>>([])

export const userInputAtom = atom<string>('')

export const loadingAtom = atom<boolean>(false)

export const modelTypeAtom = atom<Chat.ModelType>('gpt-3.5-turbo')

export const propsAtom = atom<GddiChat.Props | null>(null)

export const openAtom = atom<boolean>(false)

export const renderMessageListAtom = atom(get => {
  const messageList = get(messageListAtom)
  const loading = get(loadingAtom)

  return messageList
    .concat(
      loading ? [
        {
          ...createMessage({ role: 'assistant', content: '......' }),
          preview: true,
        },
      ] : []
    )
})
