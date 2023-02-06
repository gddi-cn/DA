import React from 'react'
import styled from 'styled-components'
import { Button as AntdButton } from 'antd'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px;
`

const Button = styled(AntdButton)`
  background-color: #061926;
  border-color: #061926;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  padding: 5px 20px;
  color: #fff;
  &:hover, &:focus {
    background-color: #061926;
    border-color: #061926;
  }
`

const ApplyButton: React.FC<{ openDialog: () => void }> = (
  {
    openDialog,
  }
) => {
  return (
    <Container>
      <Button type={'primary'} onClick={openDialog}>申请授权</Button>
    </Container>
  )
}

export default ApplyButton
