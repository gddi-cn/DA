import { PrimaryBtn } from '@src/components/Btn'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { currentStepAtom, selectedAppListAtom } from '../store'
import { Deploy } from '../enums'

const useDevice = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)
  const selectedAppList = useAtomValue(selectedAppListAtom)
  const disabled = selectedAppList.length <= 0

  const handleClick = () => {
    setCurrentStep(Deploy.Step.SELECT_DEVICE)
  }

  return {
    disabled,
    handleClick,
  }
}

const Device: React.FC = () => {
  const {
    disabled,
    handleClick,
  } = useDevice()

  return (
    <PrimaryBtn disabled={disabled} onClick={handleClick}>
      设备授权
    </PrimaryBtn>
  )
}

export default Device
