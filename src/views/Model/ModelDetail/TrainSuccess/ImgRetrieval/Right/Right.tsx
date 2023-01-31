import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Grid } from './icon/grid.svg'
import { ReactComponent as Slick } from './icon/slick.svg'

import { useRight } from '../hook'
import Album from '@src/components/Album'

const Container = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  overflow: hidden;
  padding-right: 16px;
  justify-content: flex-end;
`

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const IconBtn = styled.div`
  cursor: pointer;
  line-height: 0;

  svg * {
    stroke: #000000;
  }
  
  svg {
    rect {
      fill: #fff;
    }
  }
  
  &[selected] {
    cursor: default;
    svg * {
      stroke: #62B0E5;
    }
  }
`

const Right: React.FC = () => {
  const { imgList, type, handleGrid, handleSlick, gridRef, slickRef } = useRight()

  return (
    <Container>
      <Header>
        <ToolBox>
          <IconBtn onClick={handleGrid} ref={gridRef}>
            <Grid />
          </IconBtn>
          <IconBtn onClick={handleSlick} ref={slickRef}>
            <Slick />
          </IconBtn>
        </ToolBox>
      </Header>
      <Album type={type} imgList={imgList} />
    </Container>
  )
}

export default Right

