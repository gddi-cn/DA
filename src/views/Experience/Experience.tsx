import React from 'react'
import styled from 'styled-components'

import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import Footer from './Footer'
import Create from './Create'
import Pending from './Pending'
import SetUp from './Setup'
import Ready from './Ready'
import Expire from './Expire'

import { useExperience } from './hook'
import { Spin } from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 50px);
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-top: 60px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  color: #62B0E5;
  margin: 0;
  line-height: 44px;
  padding-left: 48px;
`

const Experience: React.FC = () => {
  const { loading } = useExperience()

  return (
    <Container>
      <TaskStep />
      <Title>应用平台部署（体验版）</Title>
        <Content>
          <Spin spinning={loading}>
            <div>
              <Create />
              <Pending />
              <SetUp />
              <Ready />
              <Expire />
            </div>
          </Spin>
        </Content>
      <Footer />
    </Container>
  )
}

export default Experience
