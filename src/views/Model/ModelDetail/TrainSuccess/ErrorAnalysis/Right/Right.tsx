import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Album from '@src/components/Album'

import { useAlbum } from './hook'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Right: React.FC = () => {
  const { displayType } = useAlbum()

  return (
    <Container>
      <Header />
      <Album type={displayType} />
    </Container>
  )
}

export default Right
