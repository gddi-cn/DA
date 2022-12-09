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

const AlbumContainer = styled.div<{ px?: number }>`
  flex: 1;
  overflow: hidden;
  padding: 24px ${props => props.px || 0}px 0
`

const Right: React.FC = () => {
  const { displayType, dataList } = useAlbum()

  return (
    <Container>
      <Header />
      <AlbumContainer px={Number(displayType === 'slick') * 76}>
        <Album type={displayType} imgList={dataList} />
      </AlbumContainer>
    </Container>
  )
}

export default Right
