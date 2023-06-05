import React from 'react'
import styled from 'styled-components'

import MoveDevice from './MoveDevice'
import CopyDevice from './CopyDevice'
import Unregister from './Unregister'
import Process from './Process'

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const Operations: React.FC = () => {
  return (
    <Container>
      <MoveDevice />
      <CopyDevice />
      <Process />
      <Unregister />
    </Container>
  )
}

export default Operations
