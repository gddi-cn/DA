import React from 'react'
import styled from 'styled-components'

import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import Step from './Step'
import Footer from './Footer'

import SelectApp from './SelectApp'
import SecondLayout from './SecondLayout'
import Sync from './Sync'
import Notify from './Notify'

import { usePlatform } from './hook'

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

const Wrap = styled.div`
  flex: 1;
  overflow: hidden;
  padding-bottom: 20px;
  max-height: 970px;
`

const Platform: React.FC = () => {
  const { showSelectApp, showConfig, showSelectDevice, showContent, showSync } = usePlatform()

  return (
    <Container>
      <TaskStep />
      {
        showContent ? (
          <>
            <Content>
              <Step />
              <Wrap>
                {
                  showSelectApp ? <SelectApp /> : null
                }
                {
                  showConfig || showSelectDevice ? (
                    <SecondLayout />
                  ) : null
                }
                {
                  showSync ? <Sync /> : null
                }
              </Wrap>
            </Content>
            <Footer />
          </>
        ) : (
          <Notify />
        )
      }
    </Container>
  )
}

export default Platform
