import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Left from './Left'
import Right from './Right'
import NoData from './NoData'

import { useErrorAnalysis } from './hook'

const Container = styled.div`
  max-height: calc(100vh - 170px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
`

const Content = styled.div`
  flex: 1;
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 12px 12px 12px;
  padding: 16px 0 16px 16px;
  display: flex;
  column-gap: 20px;
`

const RightContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`

const ErrorAnalysis: React.FC = () => {
  const { empty } = useErrorAnalysis()

  return (
    <Container>
      <Header />
      <Content>
        {
          empty ? (
            <NoData />
          ) : (
            <>
              <Left />
              <RightContainer>
                <Right />
              </RightContainer>
            </>
          )
        }
      </Content>
    </Container>
  )
}

export default ErrorAnalysis
