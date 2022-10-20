import { CreateDatasetStep } from '@src/UIComponents'
import TaskStep from '@src/views/container/TaskStepLayout/TaskStep'
import { Outlet, useLocation } from 'react-router-dom';

import {
  APP_LOCAL_FILE_STEP_1,
  APP_LOCAL_FILE_STEP_2,
  APP_LOCAL_FILE_STEP_3,
  APP_LOCAL_FILE_STEP_4
} from '@router'
import './LocalDataSet.module.less'

const pathkeys :{
  [index:string]:number
} = {
  [APP_LOCAL_FILE_STEP_1]: 1,
  [APP_LOCAL_FILE_STEP_2]: 2,
  [APP_LOCAL_FILE_STEP_3]: 3,
  [APP_LOCAL_FILE_STEP_4]: 4,
}

export type CreateInfo={
    scenes?:string,
    name?: string,
    summary?: string
    cover?: string
}

const LocalDataSet = (): JSX.Element => {
  const location = useLocation()
  const { pathname } = location
  const currentStep = pathkeys[pathname] || 1
  return (
    <div styleName='LocalDataSet'>
      <TaskStep />
      <div className='step_wrap'>
        <CreateDatasetStep type='local' activeKey={currentStep} />
      </div>
      <div className='content_wrap'>
        <Outlet />
      </div>

    </div>
  )
}

export default LocalDataSet
