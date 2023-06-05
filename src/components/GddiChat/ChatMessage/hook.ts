import { ChatMessageProps } from "./types";
import defaultUserAvatar from './user_avatar.svg'
import defaultSystemAvatar from './system_avatar.svg'

export async function copyToClipboard(
  text: string,
  onSuccess?: () => void,
  onError?: () => void,
) {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess && onSuccess()
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      onSuccess && onSuccess()
    } catch (error) {
      onError && onError()
    }
    document.body.removeChild(textArea);
  }
}

export function selectOrCopy(el: HTMLElement, content: string) {
  const currentSelection = window.getSelection();

  if (currentSelection?.type === "Range") {
    return false;
  }

  copyToClipboard(content);

  return true;
}

export const useChatMessage = ({
  message,
  defaultShow,
  parentRef,
  onDelete,
  onRetry,
  onUserStop,
  onDoubleClick: _onDoubleClick,
  backgroundColor,
  noBorder,
  systemAvatar,
  userAvatar,
  showActions = false,
}: ChatMessageProps) => {
  const { role, preview, streaming, content, date } = message

  const isUser = role === 'user'
  const showTyping = preview && streaming
  const showDate = !isUser && !preview
  const loading = (preview || content.length === 0) && !isUser
  const dateString = date.toLocaleString()

  const onRightClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!selectOrCopy(e.currentTarget, content)) return

    e.preventDefault()
  }

  const onDoubleClick = () => {
    _onDoubleClick && _onDoubleClick(content)
  }

  const itemClassName = `chat-message-item${noBorder ? '-no-border' : ''}`

  const avatar = isUser ? (userAvatar || defaultUserAvatar) : (systemAvatar || defaultSystemAvatar)

  const avatarClassName = `chat-message-avatar${noBorder ? '-no-border' : ''}`

  return {
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
    backgroundColor: backgroundColor || 'rgba(0, 0, 0, .05)',
    itemClassName,
    avatar,
    avatarClassName,
  }
}
