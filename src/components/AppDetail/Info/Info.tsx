import React from 'react'
import styled from 'styled-components'

import Box from '@src/components/Box'
import { PrimaryBtn } from '@src/components/Button'
import Header from './Header'
import Meta from './Meta'
import Config from './Config'
import Deploy from './Deploy'

import { useInfo } from './hook'
import { AppDetail } from '../enums'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Info: React.FC = () => {
  const { handleClose } = useInfo()

  return (
    <Box
      header={<Title>应用详情</Title>}
      footer={(
        <Footer>
          <PrimaryBtn width={97} onClick={handleClose}>返回</PrimaryBtn>
        </Footer>
      )}
    >
      <Container>
        <Content>
          <Header />
          <Meta />
          <Config />
          <Deploy />
        </Content>
      </Container>
    </Box>
  )
}

export default Info

