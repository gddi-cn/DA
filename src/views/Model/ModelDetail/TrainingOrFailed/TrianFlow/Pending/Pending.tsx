import React from 'react'
import styled from 'styled-components'
import waiting from './watting_resource.gif'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  display: block;
  height: 50%;
  width: 50%;
  object-fit: contain;
`

const Pending: React.FC = () => {
  return (
    <Container>
      <Img src={waiting} />
    </Container>
  )
}

export default Pending
