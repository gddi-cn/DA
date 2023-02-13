import React from 'react'

import { useCreateApp } from './hook'
import Meta from './Meata'
import Template from './Template'
import Config from './Config'
import { Space } from '@src/views/Space/enums'

const Create: React.FC = () => {
  const { currentStep } = useCreateApp()

  return (
    <>
      { currentStep === Space.App.Create.Step.META ? <Meta /> : null }
      { currentStep === Space.App.Create.Step.TEMPLATE ? <Template /> : null }
      { currentStep === Space.App.Create.Step.CONFIG ? <Config /> : null }
    </>
  )
}

export default Create

