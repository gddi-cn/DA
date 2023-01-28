import React from 'react'
import styled from 'styled-components'

import { useStep } from './hook'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 36px;
`

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    color: #62B0E5;
    font-weight: 400;
  }
  &[active] > p {
    color: #303133;
    font-weight: 500;
  }
`


const Text = styled.p`
  margin-top: 6px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`

const Step: React.FC = () => {
  const {
    selectAppRef,
    configRef,
    selectDeviceRef,
    syncRef,
    templateIcon,
    configIcon,
    deviceIcon,
    syncIcon,
    firstNextIcon,
    secondNextIcon,
    thirdNextIcon,
  } = useStep()

  return (
    <Container>
      <IconWrap ref={selectAppRef}>
        {templateIcon}
        <Text>选择应用</Text>
      </IconWrap>
      <IconWrap>
        {firstNextIcon}
      </IconWrap>
      <IconWrap ref={configRef}>
        {configIcon}
        <Text>配置参数</Text>
      </IconWrap>
      <IconWrap>
        {secondNextIcon}
      </IconWrap>
      <IconWrap ref={selectDeviceRef}>
        {deviceIcon}
        <Text>选择设备</Text>
      </IconWrap>
      <IconWrap>
        {thirdNextIcon}
      </IconWrap>
      <IconWrap ref={syncRef}>
        {syncIcon}
        <Text>下发部署</Text>
      </IconWrap>
    </Container>
  )
}

export default Step
