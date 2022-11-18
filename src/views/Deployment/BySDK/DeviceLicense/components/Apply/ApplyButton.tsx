import React from 'react'
import styled from 'styled-components'
import { Button as AntdButton } from 'antd'

const Container = styled.div`
  padding-bottom: 20px;
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const Button = styled(AntdButton)`
  background-color: #061926;
  border-color: #061926;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-style: normal;
  font-family: 'PingFang SC',serif;
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
