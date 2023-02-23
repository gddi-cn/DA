import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'
import Scrollbar from '@src/components/Scrollbar'
import React from 'react'
import styled from 'styled-components'

import { useOverview } from './hook'

const Container = styled.div`
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
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
  overflow: hidden;
  padding-top: 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
`

const ScrollWrap = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Long = styled.div`
  height: 4000px;
  background-color: #ffffaa;
`

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Overview: React.FC = () => {
  const {
    handleCancel,
    handlePre,
    handleDeploy,
    handleExport,
  } = useOverview()

  return (
    <Container>
      <Header>
        <Title>总览</Title>
      </Header>
      <Content>
        <Scrollbar>
          <ScrollWrap>
            <Long />
          </ScrollWrap>
        </Scrollbar>
      </Content>
      <Footer>
        <SecondaryBtn width={97} onClick={handleCancel}>取消</SecondaryBtn>
        <FooterRight>
          <SecondaryBtn width={97} onClick={handlePre}>上一步</SecondaryBtn>
          <SecondaryBtn width={97} onClick={handleExport}>离线导出</SecondaryBtn>
          <PrimaryBtn width={97} onClick={handleDeploy}>在线部署</PrimaryBtn>
        </FooterRight>
      </Footer>
    </Container>
  )
}

export default Overview

