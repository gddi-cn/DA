import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Left from './Left'
import Right from './Right'

import { useErrorAnalysis } from './hook'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 12px 12px 12px;
  padding: 16px;
  display: flex;
  column-gap: 20px;
`

const RightContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`

const ErrorAnalysis: React.FC = () => {
  useErrorAnalysis()

  return (
    <Container>
      <Header />
      <Content>
        <Left />
        <RightContainer>
          <Right />
        </RightContainer>
      </Content>
    </Container>
  )
}

export default ErrorAnalysis
