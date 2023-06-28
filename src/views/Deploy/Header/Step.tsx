import { useAtomValue } from 'jotai'
import React from 'react'
import styled from 'styled-components'

import { currentStepAtom } from '../store'
import { ReactComponent as AppActiveIcon } from '@src/asset/icons/platform/template_active.svg'
import { ReactComponent as NextIcon } from '@src/asset/icons/platform/next.svg'
import { ReactComponent as NextActiveIcon } from '@src/asset/icons/platform/next_active.svg'
import { ReactComponent as DeviceIcon } from '@src/asset/icons/platform/device.svg'
import { ReactComponent as DeviceActiveIcon } from '@src/asset/icons/platform/device_active.svg'
import { ReactComponent as ConfigIcon } from '@src/asset/icons/platform/sync.svg'
import { ReactComponent as ConfigActiveIcon } from '@src/asset/icons/platform/sync_active.svg'
import { Deploy } from '../enums'

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

const setActive = (ref: React.MutableRefObject<HTMLDivElement | null>) =>
  ref.current?.setAttribute('active', '')

const setInactive = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  ref.current?.removeAttribute('active')
}

const useStep = () => {
  const currentStep = useAtomValue(currentStepAtom)

  const appRef = React.useRef<HTMLDivElement>(null)
  const deviceRef = React.useRef<HTMLDivElement>(null)
  const configRef = React.useRef<HTMLDivElement>(null)

  const appIcon = <AppActiveIcon />
  const deviceIcon = currentStep >= Deploy.Step.SELECT_DEVICE
    ? <DeviceActiveIcon />
    : <DeviceIcon />
  const configIcon = currentStep >= Deploy.Step.CONFIG
    ? <ConfigActiveIcon />
    : <ConfigIcon />
  const firstArrowIcon = currentStep >= Deploy.Step.SELECT_DEVICE
    ? <NextActiveIcon />
    : <NextIcon />
  const SecondArrowIcon = currentStep >= Deploy.Step.CONFIG
    ? <NextActiveIcon />
    : <NextIcon />

  React.useEffect(
    () => {
      switch (currentStep) {
        case Deploy.Step.SELECT_APP:
          setActive(appRef)
          setInactive(deviceRef)
          setInactive(configRef)
          break;
        case Deploy.Step.SELECT_DEVICE:
          setActive(appRef)
          setActive(deviceRef)
          setInactive(configRef)
          break;
        case Deploy.Step.CONFIG:
          setActive(appRef)
          setActive(deviceRef)
          setActive(configRef)
          break;
        default:
          break;
      }
    },
    [currentStep]
  )

  return {
    appRef,
    deviceRef,
    configRef,
    appIcon,
    deviceIcon,
    configIcon,
    firstArrowIcon,
    SecondArrowIcon,
  }
}

const Step: React.FC = () => {
  const {
    appRef,
    deviceRef,
    configRef,
    appIcon,
    deviceIcon,
    configIcon,
    firstArrowIcon,
    SecondArrowIcon,
  } = useStep()

  return (
    <Container>
      <IconWrap ref={appRef}>
        {appIcon}
        <Text>选择应用</Text>
      </IconWrap>
      <IconWrap>
        {firstArrowIcon}
      </IconWrap>
      <IconWrap ref={deviceRef}>
        {deviceIcon}
        <Text>选择设备</Text>
      </IconWrap>
      <IconWrap>
        {SecondArrowIcon}
      </IconWrap>
      <IconWrap ref={configRef}>
        {configIcon}
        <Text>下发部署</Text>
      </IconWrap>
    </Container>
  )
}

export default Step
