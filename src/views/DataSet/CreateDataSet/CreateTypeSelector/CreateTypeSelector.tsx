import React from 'react'
import styled from 'styled-components'

import Footer from './Footer'
import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import Local from './Local'
import ThirdParty from './ThirdParty'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  row-gap: 40px;
  padding-top: 48px;
  overflow-y: auto;
`

const CreateTypeSelector: React.FC = () => {
  return (
    <Container>
      <TaskStep />
      <Content>
        <Local />
        <ThirdParty />
      </Content>
      <Footer />
    </Container>
  )
}

export default CreateTypeSelector
