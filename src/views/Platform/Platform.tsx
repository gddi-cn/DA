import React from 'react'
import styled from 'styled-components'

import Footer from './Footer'
import TaskStep from '@views/container/TaskStepLayout/TaskStep'

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

const Platform: React.FC = () => {
  return (
    <Container>
      <TaskStep />
      <Content>
        123
      </Content>
      <Footer />
    </Container>
  )
}

export default Platform
