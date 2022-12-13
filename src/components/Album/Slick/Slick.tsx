import React from 'react'
import styled from 'styled-components'

import Content from './Content'
import Slider from './Slider'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const Top = styled.div`
  flex: 6;
  width: 100%;
  overflow: hidden;
`

const Bottom = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`

const Yellow = styled.div`
  height: 1000px;
  background-color: #ffee88;
`

const Green = styled.div`
  height: 1000px;
  background-color: #00eeff;
`

const Slick: React.FC = () => {
  return (
    <Container>
      <Top>
        <Content />
      </Top>
      <Bottom>
        <Slider />
      </Bottom>
    </Container>
  )
}

export default Slick
