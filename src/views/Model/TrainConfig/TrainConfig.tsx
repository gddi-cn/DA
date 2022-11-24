import React from 'react'
import styled from 'styled-components'

import { FooterBar } from '@src/UIComponents'

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
`

const Left = styled.div`
  width: 248px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  height: 100%;
  overflow-y: auto;
`

const Right = styled.div`
  margin-left: 56px;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #edf8ff;
  flex: 1;
  border-right: 8px;
`

const TrainConfig: React.FC = () => {
  return (
    <Container>
      <Content>
        <Left>
          <Filter />
          <Config />
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
