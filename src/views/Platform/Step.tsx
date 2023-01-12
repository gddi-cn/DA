import React from 'react'
import styled from 'styled-components'

import { ReactComponent as SelectAppIcon } from '@src/asset/icons/platform/selectApp.svg'
import { ReactComponent as NextIcon } from '@src/asset/icons/platform/next.svg'
import { ReactComponent as ConfigIcon } from '@src/asset/icons/platform/config.svg'
import { ReactComponent as SelectDeviceIcon } from '@src/asset/icons/platform/selectDevice.svg'
import { ReactComponent as SyncIcon } from '@src/asset/icons/platform/sync.svg'

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
  p {
    color: #62b0e5;
  }
  * {
    path, line {
      fill: #62B0E5;
      color: #62B0E5;
      stroke: #62B0E5;
    } 
    rect {
      fill: transparent;
      color: #62B0E5;
      stroke: #62B0E5;
    }
  }

  &[active] {
    p {
      color: #061926;
    }
    path, line {
      fill: #061926;
      color: #061926;
      stroke: #061926;
    }
    rect {
      fill: transparent;
      color: #061926;
      stroke: #061926;
    }
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

const Step: React.FC = () => {
  const { selectAppRef, firstArrowRef, configRef, secondArrowRef, selectDeviceRef, thirdArrowRef, syncRef } = useStep()

  return (
    <Container>
      <IconWrap ref={selectAppRef}>
        <SelectAppIcon />
        <Text>选择应用</Text>
      </IconWrap>
      <ArrowWrap ref={firstArrowRef}>
        <NextIcon />
      </ArrowWrap>
      <IconWrap ref={configRef}>
        <ConfigIcon />
        <Text>配置参数</Text>
      </IconWrap>
      <ArrowWrap ref={secondArrowRef}>
        <NextIcon />
      </ArrowWrap>
      <IconWrap ref={selectDeviceRef}>
        <SelectDeviceIcon />
        <Text>选择设备</Text>
      </IconWrap>
      <ArrowWrap ref={thirdArrowRef}>
        <NextIcon />
      </ArrowWrap>
      <IconWrap ref={syncRef}>
        <SyncIcon />
        <Text>下发部署</Text>
      </IconWrap>
    </Container>
  )
}

export default Step
