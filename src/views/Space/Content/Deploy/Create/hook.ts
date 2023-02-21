import { useAtom } from 'jotai'
import React from 'react'

import { deviceTypeAtom, stepAtom } from './store'
import { Space } from '@src/views/Space/enums'

const useResetStore = () => {
  const [, setStep] = useAtom(stepAtom)
  const [, setDeviceType] = useAtom(deviceTypeAtom)

  React.useEffect(
    () => () => {
      setStep(Space.Deploy.Create.Step.DEVICE_TYPE)
      setDeviceType(undefined)
    }
  )
}

export const useCreate = () => {
  useResetStore()
  const [currentStep] = useAtom(stepAtom)

  return {
    currentStep,
  }
}
