import React from 'react'
import styled from 'styled-components'

import TaskStep from '@views/container/TaskStepLayout/TaskStep'
import Footer from './Footer'
import Step from './Step'
import BaseForm from './BaseForm'
import Requirement from './Requirement'

import { useUnremarked } from './hook'

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StepContainer = styled.div`
  width: 588px;
  margin-top: 18px;
  margin-bottom: 40px;
`

const Unremarked: React.FC = () => {
  const { currentStep } = useUnremarked()

  return (
    <Container>
      <TaskStep />
      <Content>
        <StepContainer>
          <Step currentStep={currentStep} />
        </StepContainer>
        <BaseForm />
        <Requirement />
      </Content>
      <Footer />
    </Container>
  )
}

export default Unremarked
