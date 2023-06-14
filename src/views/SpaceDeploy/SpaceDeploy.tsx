import { useAtomValue } from 'jotai'
import React from 'react'
import { currentStepAtom, useResetDeployStore } from './store'
import { Deploy } from './enums'
import AppSeclector from './AppSelector'
import DeviceSelector from './DeviceSelector'
import Overview from './Overview'

const SpaceDeploy: React.FC = () => {
  const currentStep = useAtomValue(currentStepAtom)
  const resetStore = useResetDeployStore()

  React.useEffect(
    () => resetStore,
    []
  )

  if (currentStep === Deploy.Step.APP)
    return <AppSeclector />

  if (currentStep === Deploy.Step.DEVICE)
    return <DeviceSelector />

  if (currentStep === Deploy.Step.OVERVIEW)
    return <Overview />

  return null
}

export default SpaceDeploy

