import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Top = styled.div`
  flex: 1;
  width: 100%;
  background-color: #aaeeaa;
`

const Bottom = styled.div`
  height: 90px;
  width: 100%;
  background-color: #eeaaee;
`

const Slick: React.FC = () => {
  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  )
}

export default Slick
