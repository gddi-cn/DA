import React from 'react'
import styled from "styled-components";

import { ReactComponent as BaseIcon } from '@src/asset/icons/setting.svg'
import { ReactComponent as ArrowIcon } from '@src/asset/icons/arrow_right.svg'
import { ReactComponent as RequireIcon } from '@src/asset/icons/floder.svg'
import { ReactComponent as ProcessIcon } from '@src/asset/icons/process.svg'

import { useStep } from './hook'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    fill: #62B0E5;
    color: #62B0E5;
    stroke: #62B0E5;
  }
  &[active] * {
    fill: #061926;
    color: #061926;
    stroke: #061926;
  }
`

const ArrowWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    stroke: #62B0E5;
  }
  &[active] * {
    stroke: #061926;
  }
`

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`

const Step: React.FC<{ currentStep: Unremarked.Step }> = (
  {
    currentStep,
  }
) => {
  const { baseRef, requirementRef, processRef, firstArrow, secondArrow } = useStep(currentStep)

  return (
    <Container>
      <IconWrap ref={baseRef}>
        <BaseIcon />
        <Text>基础信息</Text>
      </IconWrap>
      <ArrowWrap ref={firstArrow}>
        <ArrowIcon />
      </ArrowWrap>
      <IconWrap ref={requirementRef}>
        <RequireIcon />
        <Text>标注需求</Text>
      </IconWrap>
      <ArrowWrap ref={secondArrow}>
        <ArrowIcon />
      </ArrowWrap>
      <IconWrap ref={processRef}>
        <ProcessIcon />
        <Text>标注进度</Text>
      </IconWrap>
    </Container>
  )
}

export default Step
