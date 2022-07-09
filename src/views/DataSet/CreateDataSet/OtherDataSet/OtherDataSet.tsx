
import { CreateDatasetStep } from '@src/UIComponents'
import SelectProject from './SelectProject'
import SelectPlatform from './SelectPlatform'
import BaseInfoForm from './BaseInfoForm'
import AfterCreate from './AfterCreate'
import { useEffect, useMemo, useState } from 'react'
import './OtherDataSet.module.less'

const OtherDataSet = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(NaN)
  const [createInfo, setCreateInfo] = useState<any>(
    {}
  )

  console.log(createInfo, 'createInfo')

  useEffect(() => {
    setCurrentStep(1)
  }, [])

  const View = useMemo(() => {
    const arr = [
      <SelectPlatform key='SelectTrainType' setCurrentStep={setCurrentStep} createInfo={createInfo} setCreateInfo={setCreateInfo} />,
      <SelectProject key='DatasetBaseInfoForm' setCurrentStep={setCurrentStep} createInfo={createInfo} setCreateInfo={setCreateInfo} />,
      <BaseInfoForm key='SelectDatasetFile' setCurrentStep={setCurrentStep} createInfo={createInfo} setCreateInfo={setCreateInfo} />,
      <AfterCreate key='AfterUploaded' setCurrentStep={setCurrentStep} />
    ]
    return arr[currentStep - 1] || null
  }, [currentStep, createInfo])
  return (
    <div styleName='OtherDataSet'>
      <div className='step_wrap'>
        <CreateDatasetStep type='thirdparty' activeKey={1} />
      </div>
      <div className='content_wrap'>
        {View}
      </div>
    </div>
  )
}

export default OtherDataSet
