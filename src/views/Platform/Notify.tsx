import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

import { PrimaryBtn } from '@src/components/Button'

import { useNotify } from './hook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`

const Img = styled.img`
  display: block;
  width: 200px;
  height: 200px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  margin-top: 40px;
  color: #202223;
`

const Tip = styled.p`
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
`

const Btn = styled(PrimaryBtn)`
  margin-top: 40px;
`

const LoadingWrap = styled.div`
  height: 100px;
  width: 100px;
`

const Notify: React.FC = () => {
  const { handleClick } = useNotify()

  return (
    <Container>
      <Spin size={'large'} style={{ fontSize: 100 }}>
        <LoadingWrap />
      </Spin>
      <Title>算法应用预计 10 分钟内完成，请耐心等待</Title>
      <Tip>请稍后在设备应用部署平台确认情况，若在 10 分钟后算法应用仍未部署成功，您可以尝试重新下发部署</Tip>
      <Btn onClick={handleClick}>返回应用列表</Btn>
    </Container>
  )
}

export default Notify
