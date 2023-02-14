import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Meta from './Meta'
import Config from './Config'
import Deploy from './Deploy'

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


const Info: React.FC = () => {

  return (
    <Container>
      <Content>
        <Header />
        <Meta />
        <Config />
        <Deploy />
      </Content>
    </Container>
  )
}

export default Info

