import React from 'react'

import { useChatMessageList } from './hook'
import { ChatMessageListProps, ChatMessageListRef } from './types'
import ChatMessage from '../ChatMessage'
import Header from '../Header'

import styles from './styles.module.scss'
import Rating from '../Rating'

const ChatMessageList = React.forwardRef<ChatMessageListRef, ChatMessageListProps>((props, ref) => {
  const {
    scrollRef,
    messageList,
    onWheel,
    onScroll,
    onMouseDown,
    onUserStopMessage,
    onDeleteMessage,
    onRetryMessage,
    onDoubleClickMessage,
    messageBgColor,
    messageNoBorder,
    systemAvatar,
    userAvatar,
    timeout,
    onRating,
  } = useChatMessageList(props, ref)

  return (
    <div
      className={styles['message-list']}
      ref={scrollRef}
      onWheel={onWheel}
      onScroll={onScroll}
      onMouseDown={onMouseDown}
    >
      <Header />
      {
        messageList.map((message, i) => {
          if (message.gType === 'rating') {
            return (
              <Rating key={i} timeout={timeout} onRating={onRating} />
            )
          }

          return (
            <ChatMessage
              key={i}
              message={message}
              parentRef={scrollRef}
              onUserStop={() => onUserStopMessage && onUserStopMessage(message, i)}
              onDelete={() => onDeleteMessage && onDeleteMessage(message, i)}
              onRetry={() => onRetryMessage && onRetryMessage(message, i)}
              onDoubleClick={onDoubleClickMessage}
              backgroundColor={messageBgColor}
              noBorder={messageNoBorder}
              systemAvatar={systemAvatar}
              userAvatar={userAvatar}
              defaultShow={i >= messageList.length - 10}
              showActions={
                message.role !== 'user'
                && !(message.preview || message.content.length === 0)
                && i > 0
              }
            />
          )
        })
      }
    </div>
  )
})

export default ChatMessageList
