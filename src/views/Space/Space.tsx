import React from 'react'
import styled from 'styled-components'

import { useSpace } from './hook'
import Scrollbar from '@src/components/Scrollbar'

import LeftContent from './LeftContent'

const Container = styled.div`
  height: calc(100vh - 50px);
  background-color: #F6F9FB;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #202223;
  padding: 10px 0;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  column-gap: 56px;
  padding: 20px 40px;
  overflow: hidden;
`

const Left = styled.div`
  background-color: #fff;
  height: 100%;
  width: 248px;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px 0;
  max-height: 843px;
`


const Right = styled.div`
  height: 100%;
  flex: 1;
  overflow: hidden;
`

const Space: React.FC = () => {
  useSpace()

  return (
    <Container>
      <Title>个人中心</Title>
      <Content>
        <Left>
          <Scrollbar autoHide>
            <LeftContent />
          </Scrollbar>
        </Left>
        <Right>right</Right>
      </Content>
    </Container>
  )
}

export default Space
