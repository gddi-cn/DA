import { Space } from '@src/views/Space/enums'
import React from 'react'

import { useCreate } from './hook'
import DeviceTypeSelector from './DeviceTypeSelector'
import AppSelector from './AppSelector'
import DeviceSelector from './DeviceSelector'
import Overview from './Overview'

const Create: React.FC = () => {
  const { currentStep } = useCreate()

  return (
    <>
      { currentStep === Space.Deploy.Create.Step.DEVICE_TYPE ? <DeviceTypeSelector /> : null }
      { currentStep === Space.Deploy.Create.Step.APP ? <AppSelector /> : null }
      { currentStep === Space.Deploy.Create.Step.DEVICE ? <DeviceSelector /> : null }
      { currentStep === Space.Deploy.Create.Step.OVERVIEW ? <Overview /> : null }
    </>
  )
}

export default Create

