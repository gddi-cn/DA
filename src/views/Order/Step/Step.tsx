import React from 'react'
import { Steps as AntSteps } from "antd";
import styled from "styled-components";

import { useStep } from './hook'

import { SubTitle, Divider } from '../components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StepWrap = styled.div`
  flex: 1;
`

const Steps = styled(AntSteps)`
  height: 100%;
  .ant-steps-item-icon {
    width: 24px!important;
    display: flex!important;
    justify-content: center;
  }
  .ant-steps-item-title {
    padding-top: 3.5px;
  }
`

const Step: React.FC = () => {
  const { current, items }  = useStep()
  return (
    <Container>
      <SubTitle>任务进度</SubTitle>
      <Divider />
      <StepWrap>
        <Steps
          size={'small'}
          direction="vertical"
          current={current} items={items}
        />
      </StepWrap>
    </Container>
  )

}

export default Step
