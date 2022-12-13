import React from 'react'
import styled from 'styled-components'

import { useAlbum } from './hook'
import Grid from './Grid'
import Slick from './Slick'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Album: React.FC<Album.Props> = (props) => {
  const { displayType } = useAlbum(props)

  return (
    <Container>
      {
        displayType === 'grid' ? (
          <Grid />
        ) : (
          <Slick />
        )
      }
    </Container>
  )
}

export default Album
