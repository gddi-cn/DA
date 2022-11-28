import React from 'react'
import styled from 'styled-components'

import { FooterBar, ReactCusScrollBar } from '@src/UIComponents'

import Filter from './components/Filter'
import Config from './components/Config'
import ChipList from './components/ChipList'
import Footer from './components/Footer'

const Container = styled.div`
  height: calc(100vh - 100px);
  background-color: #F7F8FA;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  flex: 1;
  max-width: 1920px;
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

const TrainConfig: React.FC = () => {
  return (
    <Container>
      <Content>
        <Left>
          <ReactCusScrollBar id={'chip_selected_left_scroll'}>
            <LeftContent>
              <Filter />
              <Config />
            </LeftContent>
          </ReactCusScrollBar>
        </Left>
        <Right>
          <ChipList />
        </Right>
      </Content>
      <FooterBar rightContent={<Footer />} />
    </Container>
  )
}

export default TrainConfig
