import React from 'react'
import styled from 'styled-components'

import { useConfig } from '../hook'
import GddiFlow from './GddiFlow'

const Container = styled.div`
  height: 100%;
`

const Config: React.FC = () => {
  const { flowValue, appBaseINfo } = useConfig()

  return (
    <Container>
      <GddiFlow flowValue={flowValue} appBaseInfo={appBaseINfo} />
    </Container>
  )
}

export default Config
