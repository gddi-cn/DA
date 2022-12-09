import React from 'react'
import styled from 'styled-components'

import { usePainter } from './hook'

import FullScreenModal from '@src/components/FullScreenModal'
import ZoomArea from '@src/components/ZoomArea'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const RawImg = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: contain;
`
const Painter: React.FC<Album.ImgMeta> = (props) => {
  const { src, rawSrc, open, onClick, onClose } = usePainter(props)
  return (
    <Container onClick={onClick}>
      <RawImg src={rawSrc} alt={'raw'} />
      <FullScreenModal open={open} onClose={onClose}>
        <ZoomArea>
          <RawImg src={src} alt={'result'} />
        </ZoomArea>
      </FullScreenModal>
    </Container>
  )
}

export default Painter
