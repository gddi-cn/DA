import { useAtomValue } from 'jotai'
import React from 'react'

import { currentStepAtom } from '../store'
import { Deploy } from '../enums'
import SelectApp from '../SelectApp'
import SelectDevice from '../SelectDevice'
import Config from '../Config'

const Content: React.FC = () => {
  const currentStep = useAtomValue(currentStepAtom)

  if (currentStep === Deploy.Step.SELECT_APP)
    return <SelectApp />

  if (currentStep === Deploy.Step.SELECT_DEVICE)
    return <SelectDevice />

  if (currentStep === Deploy.Step.CONFIG)
    return <Config />

  return null
}

export default Content
