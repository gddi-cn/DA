import React from 'react'

// import Markdown from 'components/Markdown'
import { ChatMessageProps } from './types'
import { useChatMessage, copyToClipboard } from './hook'

import styles from './styles.module.scss'

const Markdown = React.lazy(() => import('../Markdown'))

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const {
    parentRef,
    isUser,
    showActions,
    showTyping,
    showDate,
    streaming,
    dateString,
    content,
    loading,
    defaultShow,
    onDelete,
    onRetry,
    onUserStop,
    onDoubleClick,
    onRightClick,
    backgroundColor,
    itemClassName,
    avatar,
    avatarClassName,
  } = useChatMessage(props)

  return (
    <div className={styles[`chat-message${ isUser ? '-user' : ''}`]}>
      <div className={styles['chat-message-container']}>
        <div className={styles['chat-message-acatar']}>
          <div className={styles[avatarClassName]}>
            <img src={avatar} />
          </div>
        </div>
        {
          showTyping ? (
            <div className={styles['chat-message-status']}>
              正在输入...
            </div>
          ) : null
        }
        <div className={styles[itemClassName]} style={{ backgroundColor }}>
          {
            showActions ? (
              <div
                className={styles['chat-message-top-actions']}
                onClick={() => onUserStop && onUserStop()}
              >
                {
                  streaming ? (
                    <div
                      className={styles['chat-message-top-action']}
                      onClick={() => onUserStop && onUserStop()}
                    >
                      停止
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles['chat-message-top-action']}
                        onClick={() => onDelete && onDelete()}
                      >
                        删除
                      </div>
                      <div
                        className={styles['chat-message-top-action']}
                        onClick={() => onRetry && onRetry()}
                      >
                        重试
                      </div>
                    </>
                  )
                }
                <div
                  className={styles['chat-message-top-action']}
                  onClick={() => copyToClipboard(content)}
                >
                  复制
                </div>
              </div>
            ) : null
          }
          {
            <React.Suspense fallback={<h4>...</h4>}>
              <Markdown
                content={content}
                loading={loading}
                parentRef={parentRef!}
                fontSize={14}
                defaultShow={defaultShow}
                onContextMenu={onRightClick}
                onDoubleClickCapture={onDoubleClick}
              />
            </React.Suspense>
          }
        </div>
        {
          showDate ? (
            <div className={styles['chat-message-actions']}>
              <div className={styles['chat-message-action-date']}>
                {dateString}
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default ChatMessage
