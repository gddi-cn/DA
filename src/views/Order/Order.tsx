import React from 'react'
import styled from "styled-components";

import { useOrder } from './hook'

import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import CreateStep from '@views/DataSet/CreateDataSet/Unremarked/Step'

import Meta from './Meta'
import Step from './Step'
import Detail from './Detail'

import Footer from './Footer'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StepWrap = styled.div`
  width: 588px;
  margin-top: 18px;
  margin-bottom: 40px;
`

const ContentWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  height: 520px;
  width: 880px;
  column-gap: 20px;
`

const Left = styled.div`
  width: 208px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const LeftTop = styled.div`
  border-radius: 8px;
  background-color: #EDF8FF;
  padding: 20px 16px;
`

const LeftBottom = styled.div`
  flex: 1;
  border-radius: 8px;
  background-color: #EDF8FF;
  padding: 20px 16px;
  overflow: hidden;
`

const Right = styled.div`
  flex: 1;
  border-radius: 8px;
  background-color: #EDF8FF;
  padding: 20px 16px;
  position: relative;
`

const Corner = styled.div`
  width: 135px;
  height: 28px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #62B0E5;
  border-radius: 0 8px 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #FFFFFF;
`

const Order: React.FC = () => {
  useOrder()

  return (
    <Container>
      <TaskStep />
      <StepWrap>
        <CreateStep currentStep={'process'} />
      </StepWrap>
      <ContentWrap>
        <Content>
          <Left>
            <LeftTop>
              <Meta />
            </LeftTop>
            <LeftBottom>
              <Step />
            </LeftBottom>
          </Left>
          <Right>
            <Corner>
              Powered by 曼孚
            </Corner>
            <Detail />
          </Right>
        </Content>
      </ContentWrap>
      <Footer />
    </Container>
  )
}

export default Order
