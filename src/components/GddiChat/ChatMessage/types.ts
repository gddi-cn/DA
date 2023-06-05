import React from 'react';
import { Chat } from '../types'

export interface ChatMessageProps {
  message: Chat.RenderMessage
  parentRef: React.RefObject<HTMLDivElement>
  defaultShow?: boolean
  onUserStop?: () => void
  onDelete?: () => void
  onRetry?: () => void
  onDoubleClick?: (content: string) => void
  backgroundColor?: React.CSSProperties['backgroundColor']
  noBorder?: boolean
  systemAvatar?: string
  userAvatar?: string
  showActions?: boolean
}
