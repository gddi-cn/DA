import React from 'react'
import styled from 'styled-components'

import Painter from '../Painter'


const Container = styled.div`
  outline: 1px solid #edf8ff;
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
  }
`

const GridItem: React.FC<Album.ImgMeta> = (data) => {
  return (
    <Container>
      <Painter {...data} />
    </Container>
  )
}

export default GridItem
