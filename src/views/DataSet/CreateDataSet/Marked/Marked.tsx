import { Provider, useAtomValue } from 'jotai'
import React, { lazy } from 'react'
import styled from 'styled-components'

import TaskStep from '@src/views/container/TaskStepLayout/TaskStep'
import { CreateDatasetStep } from '@src/UIComponents'
import { currentStepAtom } from './store'
import { EMarked } from './enums'
import { CircularProgress } from '@mui/material'

const TrainTypeSelector = lazy(() => import('./TrainTypeSelector'))
const BaseForm = lazy(() => import('./BaseForm'))
const DatasetSelector = lazy(() => import ('./DatasetSelector'))
const Result = lazy(() => import('./Result'))

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const StepWrap = styled.div`
  margin-top: 6px;
`

const ContentWrap = styled.div`
  flex: 1;
  padding-top: 20px;
`

const Content: React.FC = () => {
  const currentStep = useAtomValue(currentStepAtom)

  if (currentStep === EMarked.Step.SELECT_TRAIN_TYPE)
    return <TrainTypeSelector />

  if (currentStep === EMarked.Step.BASE_FORM)
    return <BaseForm />

  if (currentStep === EMarked.Step.SELECT_DATASET)
    return <DatasetSelector />
  
  if (currentStep === EMarked.Step.RESULT)
    return <Result />

  return null
}

const Fallback: React.FC = () => {
  return (
    <div
      style={{
        height: '100%',
        paddingTop: 80,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  )
}

const Inner: React.FC = () => {
  const currentStep = useAtomValue(currentStepAtom)

  return (
    <Container>
      <TaskStep />
      <StepWrap>
        <CreateDatasetStep type='local' activeKey={currentStep} />
      </StepWrap>
      <ContentWrap>
        <React.Suspense fallback={<Fallback />}>
          <Content />
        </React.Suspense>
      </ContentWrap>
    </Container>
  )
}


const Marked: React.FC = () => {
  return (
    <Provider>
      <Inner />
    </Provider>
  )
}

export default Marked
