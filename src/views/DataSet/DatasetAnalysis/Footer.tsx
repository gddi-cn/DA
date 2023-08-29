import React from 'react'
import styled from 'styled-components'

import {FooterBar} from "@src/UIComponents";
import { SecondaryBtn, PrimaryBtn } from "@src/components/Button";
import {useBack2DatasetIndex} from "@src/hooks/task";
import { socketPushMsgForProject } from '@ghooks'
import {useNavigate} from "react-router-dom";
import {APP_DATA_SET_INDEX, APP_MODEL_TRAIN_CONFIG} from "@router";
import {useSelector} from "react-redux";
import {RootState} from "@reducer";
import {SNAPSHOT_KEY_OF_ROUTER} from "@src/constants";
import {useAtomValue} from "jotai";
import {analysisAssessAtom} from "@views/DataSet/DatasetAnalysis/store";
import {DatasetAnalysisStatus} from "@src/shared/enum/dataset";


const FooterRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const useFooter = () => {
  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })


  const handleCancel = useBack2DatasetIndex()

  const handlePrev = () => {
    navigate({ pathname: APP_DATA_SET_INDEX })
    socketPushMsgForProject(
      activePipeLine,
      {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
        APP_DATASET_ANALYSE: null
      }
    )
  }


  return {
    handleCancel,
    handlePrev,
  }
}

const NextBtnFallback: React.FC = () => {
  return (
    <PrimaryBtn width={132} disabled>下一步</PrimaryBtn>
  )
}

const NextBtn: React.FC = () => {
  const access = useAtomValue(analysisAssessAtom)
  const disabledNext = access?.status !== DatasetAnalysisStatus.FINISHEd

  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const handleNext = () => {
    navigate({
      pathname: APP_MODEL_TRAIN_CONFIG,
    })

    socketPushMsgForProject(
      activePipeLine,
      {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_MODEL_TRAIN_CONFIG,
      }
    )
  }

  return (
    <PrimaryBtn width={132} disabled={disabledNext} onClick={handleNext}>下一步</PrimaryBtn>
  )
}

const Footer: React.FC<{ disabledNext?: boolean }> = () => {
  const {  handleCancel, handlePrev } = useFooter()


  return (
    <FooterBar
      leftContent={(
        <SecondaryBtn width={132} onClick={handleCancel}>取消</SecondaryBtn>
      )}
      rightContent={(
        <FooterRight>
          <SecondaryBtn width={132} onClick={handlePrev}>上一步</SecondaryBtn>
          <React.Suspense fallback={<NextBtnFallback />}>
            <NextBtn />
          </React.Suspense>
        </FooterRight>
      )}
    />
  )
}

export default Footer
