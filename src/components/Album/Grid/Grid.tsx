import React from 'react'
import styled from 'styled-components'

import { useGrid } from './hook'
import Scrollbar from '@src/components/Scrollbar'

import GridItem from './GridItem'

const Container = styled.div`
  height: 100%;
`

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  padding: 0 16px 0 1px;
  @media only screen and (min-width: 1800px) {
    grid-template: auto/repeat(8, 1fr);
  }

  @media only screen and (min-width: 1700px) and (max-width: 1799px) {
    grid-template: auto/repeat(7, 1fr);
  }

  @media only screen and (min-width: 1536px) and (max-width: 1699px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1440px) and (max-width: 1535px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1200px) and (max-width: 1439px) {
    grid-template: auto/repeat(5, 1fr);
  }

  @media only screen and (min-width: 100px) and (max-width: 1199px) {
    grid-template: auto/repeat(4, 1fr);
  }

  @media only screen and (min-width: 700px) and (max-width: 999px) {
    grid-template: auto/repeat(3, 1fr);
  }

  @media only screen and (min-width: 600px) and (max-width: 699px) {
    grid-template: auto/repeat(2, 1fr);
  }
`


const Grid: React.FC = () => {
  const { dataList } = useGrid()

  return (
    <Container>
      <Scrollbar autoHide>
        <GridContainer>
          {
            dataList.map((data, idx) => (
              <GridItem key={idx} {...data} />
            ))
          }
        </GridContainer>
      </Scrollbar>
    </Container>
  )
}

export default Grid
