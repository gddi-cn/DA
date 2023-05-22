import React from 'react'

import { ChatInputProps } from './types'
import { useChatInput } from './hook'
import { IconButton, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const Container = styled('div')`
  padding: 20px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  position: relative;
`

const Textarea = styled('textarea')`
  flex: 1;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: white;
  color: rgb(48, 48, 48);
  font-family: inherit;
  padding: 10px 50px 10px 14px;
  resize: none;
  outline: 1px solid transparent;
  transition: outline ease-in-out .2s;
  &:focus {
    outline: 1px solid #3693d1;
  }
`

const IconWrap = styled('div')`
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const {
    inputRef,
    value,
    onChange,
    placeholder,
    onFocus,
    onBlur,
    inputRows,
    onInputKeyDown,
    onSubmit,
  } = useChatInput(props)

  return (
    <Container>
      <Textarea
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        rows={inputRows}
        autoFocus
        onKeyDown={onInputKeyDown}
      />
      <IconWrap>
        <IconButton title={'发送'} onClick={onSubmit}>
          <SendIcon htmlColor='#3693d1' />
        </IconButton>
      </IconWrap>
    </Container>
  )
}

export default ChatInput
