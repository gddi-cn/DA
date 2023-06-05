import React from 'react'
import { Chat } from '../types'

export interface ChatMessageListProps {
  messageList: Array<Chat.RenderMessage>
  onRating: (value: number) => void
  hitBottom?: boolean
  onScroll?: React.UIEventHandler<HTMLDivElement>
  onMouseDown?: () => void
  onUserStopMessage?: (message: Chat.RenderMessage, idx: number) => void
  onDeleteMessage?: (message: Chat.RenderMessage, idx: number) => void
  onRetryMessage?: (message: Chat.RenderMessage, idx: number) => void
  onDoubleClickMessage?: (content: string) => void
  messageBgColor?: React.CSSProperties['backgroundColor']
  messageNoBorder?: boolean
  systemAvatar?: string
  userAvatar?: string
  timeout?: number
}

export interface ChatMessageListRef {
  scrollRef: React.RefObject<HTMLDivElement>
  scrollToBottom: () => void
  setAutoScroll: (autoScroll: boolean | ((old: boolean) => boolean)) => void
}
