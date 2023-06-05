import { Button } from 'antd'
import { ReactComponent as OpenIcon } from './open_icon.svg'
import React from 'react'
import styled from 'styled-components'
import { Popover } from '@mui/material'

import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList'
import { useGddiChat } from './hook'
import { GddiChat } from './types'

const Wrap = styled.div`
`

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 600px;
  width: 500px;
  background-color: #edf8ff;
  .ant-popover-inner-content {
    padding: 0!important;
    border-radius: 8px;
  }
`

const P = styled(Popover)`
  padding: 0;
  .MuiPaper-root {
    box-shadow: 0 0 10px rgba(42, 100, 139, .3);
    border-radius: 4px;
  }
`

const Header = styled.h1`
  text-align: center;
  line-height: 52px;
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  color: #2582c1;
`


const ChatBot: React.FC<GddiChat.Props> = (props) => {
  const {
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
  } = useGddiChat(props)

  return (
    <>
      <P
        open={open}
        onClose={handleClose}
        anchorEl={btnRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Container>
          <Header>
            共达地机器人
          </Header>
          <ChatMessageList
            messageList={messageList}
            messageBgColor='#fff'
            messageNoBorder
            ref={listRef}
            onRetryMessage={handleResend}
            onDeleteMessage={handleDelete}
            onUserStopMessage={handleStop}
            timeout={ratingTimeout}
            onRating={handleRating}
          />
          <ChatInput
            value={userInput}
            onChange={handleInputChange}
            placeholder='Enter 发送，Shift + Enter 换行'
            onSubmit={handleSubmit}
          />
        </Container>
      </P>
      <Button
        title='共达地机器人'
        ref={btnRef}
        type='primary' icon={<OpenIcon />}
        shape='circle' size='large'
        onClick={handleClick}
      />
    </>
  )
}

export default ChatBot
