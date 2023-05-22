import { Chat } from './types'

export const createMessage = (override: Partial<Chat.Message>): Chat.Message => ({
  id: Date.now(),
  date: new Date().toLocaleString(),
  role: 'user',
  content: '',
  ...override,
})
