
import { CreateDatasetStep } from '@src/UIComponents'
import SelectProject from './SelectProject'
import SelectPlatform from './SelectPlatform'
import BaseInfoForm from './BaseInfoForm'
import AfterCreate from './AfterCreate'
import { useEffect, useMemo, useState } from 'react'
import './OtherDataSet.module.less'

const OtherDataSet = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(NaN)

  // 之前选中曼孚的Item 数据
  const [initPageInfo, setInitPageInfo] = useState<any>(
    {}
  )

  // 第三方平台的数据
  const [thirdInfo, setThirdInfo] = useState<any>(
    {}
  )

  const [baseInfo, setBaseInfo] = useState<any>(
    {}
  )

  useEffect(() => {
    setCurrentStep(1)
  }, [])

  const View = useMemo(() => {
    const arr = [
      <SelectPlatform key='SelectTrainType' setCurrentStep={setCurrentStep} thirdInfo={thirdInfo} setThirdInfo={setThirdInfo} setInitPageInfo={setInitPageInfo} />,
      <SelectProject key='DatasetBaseInfoForm' setCurrentStep={setCurrentStep} initPageInfo={initPageInfo} thirdInfo={thirdInfo} setThirdInfo={setThirdInfo }/>,
      <BaseInfoForm key='SelectDatasetFile' setCurrentStep={setCurrentStep} setBaseInfo={setBaseInfo} baseInfo={baseInfo}/>,
      <AfterCreate key='AfterUploaded' setCurrentStep={setCurrentStep} />
    ]
    return arr[currentStep - 1] || null
  }, [currentStep, initPageInfo, thirdInfo, baseInfo])
  return (
    <div styleName='OtherDataSet'>
      <div className='step_wrap'>
        <CreateDatasetStep type='thirdparty' activeKey={currentStep} />
      </div>
      <div className='content_wrap'>
        {View}
      </div>
    </div>
  )
}

export default OtherDataSet
