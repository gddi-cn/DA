import React from 'react'
import styled from 'styled-components'

import Production from './Production'
import Footer from './Footer'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  row-gap: 40px;
  padding-top: 48px;
  overflow-y: auto;
`

const TypeSelector: React.FC = () => {
  return (
    <Container>
      <Content>
        <Production />
      </Content>
      <Footer />
    </Container>
  )
}

export default TypeSelector

