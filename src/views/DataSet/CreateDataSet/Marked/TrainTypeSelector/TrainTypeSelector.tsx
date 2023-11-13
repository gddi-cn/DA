import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Item from '../TrainTypeSelector/Item'
import { currentStepAtom, trainTypeAtom } from '../store'
import { DatasetScene } from '@src/shared/enum/dataset'
import { SecondaryBtn, PrimaryBtn } from '@src/components/Btn'
import { useBack2DatasetIndex } from '@src/hooks/task'
import { FooterBar } from '@src/UIComponents'
import { socketPushMsgForProject } from '@ghooks'
import { EMarked } from '../enums'
import { APP_DATASET_CREATE_TYPE } from '@router'
import { MODEL_TYPES, SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { RootState } from '@src/controller/reducer'
import {useCanCreateDatasetScene} from "@src/hooks/dataset";
import Scrollbars from "react-custom-scrollbars";

const Container = styled.div`
  height: calc(100vh - 186px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const List = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  gap: 20px;
`

const RightActionsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const LeftActions: React.FC = () => {
  const handleCancel = useBack2DatasetIndex()

  return (
    <SecondaryBtn onClick={handleCancel}>取消</SecondaryBtn>
  )
}

const RightActions: React.FC = () => {
  const navigate = useNavigate()
  const selectedType = useAtomValue(trainTypeAtom)
  const disabled = !selectedType
  const setCurrentStep = useSetAtom(currentStepAtom)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })


  const handlePrev = () => {
    navigate({
      pathname: APP_DATASET_CREATE_TYPE
    })

    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_CREATE_TYPE
    })
  }

  const handleNext = () => {
    if (disabled) return
    setCurrentStep(EMarked.Step.BASE_FORM)
  }

  return (
    <RightActionsContainer>
      <SecondaryBtn onClick={handlePrev}>上一步</SecondaryBtn>
      <PrimaryBtn disabled={disabled} onClick={handleNext}>下一步</PrimaryBtn>
    </RightActionsContainer>
  )
}

const TrainTypeSelector: React.FC = () => {
  const canCreateSceneList = useCanCreateDatasetScene()

  return (
    <Container>
      <Scrollbars>
        <Content>
            <List>
              {
                canCreateSceneList
                  .map(scene => (
                    <Item key={scene} scene={scene as DatasetScene} />
                  ))
              }
            </List>
        </Content>
      </Scrollbars>
      <FooterBar
        leftContent={<LeftActions />}
        rightContent={<RightActions />}
      />
    </Container>
  )
}

export default TrainTypeSelector
