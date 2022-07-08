import { CreateDatasetStep } from '@src/UIComponents'
import SelectTrainType from './SelectTrainType'
import DatasetBaseInfoForm from './DatasetBaseInfoForm'
import SelectDatasetFile from './SelectDatasetFile'

import './LocalDataSet.module.less'
import { useEffect, useMemo, useState } from 'react'

export type CreateInfo={
    scenes?:string,
    name?: string,
    summary?: string
    cover?: string
}

const LocalDataSet = (props: any): JSX.Element => {
  console.log(props)
  const [currentStep, setCurrentStep] = useState(NaN)
  const [createInfo, setCreateInfo] = useState<CreateInfo>(
    {}
  )

  console.log(createInfo, 'createInfo')

  useEffect(() => {
    setCurrentStep(1)
  }, [])

  const View = useMemo(() => {
    const arr = [
      <SelectTrainType key='SelectTrainType' setCurrentStep={setCurrentStep} createInfo={createInfo} setCreateInfo={setCreateInfo} />,
      <DatasetBaseInfoForm key='DatasetBaseInfoForm' setCurrentStep={setCurrentStep} createInfo={createInfo} setCreateInfo={setCreateInfo} />,
      <SelectDatasetFile key='SelectDatasetFile' setCurrentStep={setCurrentStep} />,

    ]
    return arr[currentStep - 1] || null
  }, [currentStep, createInfo])

  return (
    <div styleName='LocalDataSet'>
      <div className='step_wrap'>
        <CreateDatasetStep type='local' activeKey={currentStep} />
      </div>
      <div className='content_wrap'>
        {View}
      </div>

    </div>
  )
}

export default LocalDataSet
