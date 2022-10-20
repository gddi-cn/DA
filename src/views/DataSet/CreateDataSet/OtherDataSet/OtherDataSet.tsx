import { CreateDatasetStep } from '@src/UIComponents'
import TaskStep from '@src/views/container/TaskStepLayout/TaskStep'
import { Outlet, useLocation } from 'react-router-dom';

import {
  APP_THIRDPARTY_STEP_1,
  APP_THIRDPARTY_STEP_2,
  APP_THIRDPARTY_STEP_3,
  APP_THIRDPARTY_STEP_4,
  APP_THIRDPARTY_SelectTrainType
} from '@router'
import './OtherDataSet.module.less'

const pathkeys: {
    [index: string]: number
} = {
  [APP_THIRDPARTY_SelectTrainType]: 1,
  [APP_THIRDPARTY_STEP_1]: 1,
  [APP_THIRDPARTY_STEP_2]: 2,
  [APP_THIRDPARTY_STEP_3]: 3,
  [APP_THIRDPARTY_STEP_4]: 4,
}

const OtherDataSet = (): JSX.Element => {
  const location = useLocation()
  const { pathname } = location
  const currentStep = pathkeys[pathname] || 1

  return (
    <div styleName='OtherDataSet'>
      <TaskStep />
      <div className='step_wrap'>
        <CreateDatasetStep type='thirdparty' activeKey={currentStep} />
      </div>
      <div className='content_wrap'>
        <Outlet />
      </div>
    </div>
  )
}

export default OtherDataSet
