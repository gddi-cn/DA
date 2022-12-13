import React from 'react'
import styled from 'styled-components'

import { useSliderItem } from './hook'

const Container = styled.div`
  border: 1px solid #edf8ff;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  width: 100%;
  &:hover {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
  }
  &[selected] {
    border: 1px solid #48a2df;
  }
`

const Image = styled.img`
  display: block;
  object-fit: contain;
  height: 100%;
  width: 100%;
`

const Item: React.FC<Album.ImgMeta & { uid: string }> = (
  {
    uid,
    rawSrc,
    src,
  }
) => {
  const { handleClick, containerRef } = useSliderItem(uid)
  return (
    <Container onClick={handleClick} ref={containerRef}>
      <Image src={rawSrc || src} />
    </Container>
  )
}

export default Item
