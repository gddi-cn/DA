import React from 'react'
import { Popover } from 'antd'
import { QuestionCircleOutlined as QuestionIcon } from '@ant-design/icons'
import styled from 'styled-components'

import flow from '@src/asset/images/space/flow.png'

const Container = styled.div`
  width: 591px;
  padding: 20px;
`

const Title = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const FlowTitle = styled.p`
  margin-top: 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #061926;
`

const Img = styled.img`
  width: 551px;
  height: 50px;
  margin-top: 20px;
  display: block;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
`


const Flow: React.FC = () => {
  return (
    <Container>
      <Title>注册码是针对边缘盒子的注册方式，主要用于推理平台进行快速设备注册</Title>
      <FlowTitle>注册流程</FlowTitle>
      <Img src={flow} alt='flow' />
    </Container>
  )
}

const FlowTip: React.FC = () => {
  return (
    <Popover
      content={<Flow />}
      trigger={'click'}
      placement='bottomRight'
      overlayClassName='device_flow_tip_wrap'
    >
      <QuestionIcon />
    </Popover>
  )
}

export default FlowTip
