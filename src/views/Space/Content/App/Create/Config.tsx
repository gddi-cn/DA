import React from 'react'
import styled from 'styled-components'

import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import { useConfig } from './hook'

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  padding: 36px 0 0;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 20px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Content = styled.div`
  flex: 1;
  background-color: #ffcccc;
  overflow: hidden;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`

const Config: React.FC = () => {
  const { handlePre } = useConfig()

  return (
    <Container>
      <Title>参数配置</Title>
      <Content>
        123
      </Content>
      <Footer>
        <SecondaryBtn width={97} onClick={handlePre}>上一步</SecondaryBtn>
        <PrimaryBtn width={97}>创建应用</PrimaryBtn>
      </Footer>
    </Container>
  )
}

export default Config

