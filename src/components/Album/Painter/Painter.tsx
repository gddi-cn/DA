import React from 'react'
import styled from 'styled-components'
import { Spin as AntSpin } from 'antd'

import { usePainter } from './hook'

import FullScreenModal from '@src/components/FullScreenModal'
import ZoomArea from '@src/components/ZoomArea'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: zoom-in;
  position: relative;
`

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Spin = styled(AntSpin)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Painter: React.FC<Album.ImgMeta> = (props) => {
  const { rawCanvasRef, resultCanvasRef, open, onClick, onClose, resLoading } = usePainter(props)
  return (
    <Container onClick={onClick}>
      <Canvas ref={rawCanvasRef} />
      <FullScreenModal open={open} onClose={onClose}>
        <ZoomArea>
          <Canvas ref={resultCanvasRef} />
          <Spin spinning={resLoading} />
        </ZoomArea>
      </FullScreenModal>
    </Container>
  )
}

export default Painter
