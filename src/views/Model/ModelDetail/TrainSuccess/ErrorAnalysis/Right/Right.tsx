import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Album from '@src/components/Album'

import { useAlbum } from './hook'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const AlbumContainer = styled.div<{ pt?: number, px?: number }>`
  flex: 1;
  overflow: hidden;
  padding: ${props => props.pt || 0}px ${props => props.px || 0}px 0;
`

const Right: React.FC = () => {
  const { displayType, dataList } = useAlbum()

  return (
    <Container>
      <Header />
      <AlbumContainer
        pt={Number(displayType === 'slick') * 24}
        px={Number(displayType === 'slick') * 76}
      >
        <Album type={displayType} imgList={dataList} />
      </AlbumContainer>
    </Container>
  )
}

export default Right
