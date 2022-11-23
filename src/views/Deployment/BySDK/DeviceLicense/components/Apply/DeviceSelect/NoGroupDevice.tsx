import React from 'react'
import styled from 'styled-components'

import empty from '../../../assets/group_device_empty.png'

const Container = styled.div`
  padding: 83px 0 93px;
`

const Img = styled.img`
  object-fit: contain;
  display: block;
  width: 332px;
  height: 200px
`

const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
`

const Tip = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin: 0;
  text-align: center;
`

const NoGroupDevice: React.FC = () => {
  return (
    <Container>
      <Img alt={'No data'} src={empty} />
      <Title>无已注册设备</Title>
      <Tip>您还没有注册设备，请先点击上方按钮进行注册</Tip>
    </Container>
  )
}

export default NoGroupDevice
