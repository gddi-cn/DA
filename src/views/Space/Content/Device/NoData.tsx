import React from 'react'
import styled from 'styled-components'

import noDevice from '@src/asset/images/space/no_device.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Img = styled.img`
  margin-top: 60px;
  display: block;
  object-fit: contain;
  width: 332px;
  height: 200px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin-top: 40px;
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 10px;
`

const NoData: React.FC = () => {
  return (
    <Container>
      <Img src={noDevice} alt={'no device'} />
      <Title>无已注册设备</Title>
      <Tip>您还没有注册设备，请先点击上方按钮进行注册</Tip>
    </Container>
  )
}

export default NoData
