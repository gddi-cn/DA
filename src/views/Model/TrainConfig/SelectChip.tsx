import React from 'react'
import styled from 'styled-components'

import { ReactCusScrollBar } from '@src/UIComponents'
import Filter from './Filter'
import ChipList from './ChipList'

const Container = styled.div`
  max-width: 1920px;
  height: 100%;
  width: 100%;
  padding: 20px 38px;
  display: flex;
  overflow: hidden;
`

const Left = styled.div`
  width: 248px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
`

const LeftContent = styled.div`
  padding: 0 20px;
`

const Right = styled.div`
  margin-left: 56px;
  height: 100%;
  padding: 20px 0;
  overflow: hidden;
  background-color: #edf8ff;
  flex: 1;
  border-radius: 8px;
`


const SelectChip: React.FC = () => {
  return (
    <Container>
      <Left>
        <ReactCusScrollBar id={'chip_selected_left_scroll'}>
          <LeftContent>
            <Filter />
          </LeftContent>
        </ReactCusScrollBar>
      </Left>
      <Right>
        <ChipList />
      </Right>
    </Container>
  )
}

export default SelectChip
