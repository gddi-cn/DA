
import {
  APP_THIRDPARTY,
  APP_THIRDPARTY_STEP_1,
  APP_THIRDPARTY_STEP_2,
  APP_THIRDPARTY_STEP_3,
  APP_THIRDPARTY_STEP_4,
  APP_THIRDPARTY_SelectTrainType
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'

const NotFound = lazy(() => import('@src/views/NotFound'));
const OtherDataSet = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet'));

const AfterCreate = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet/AfterCreate'));

const BaseInfoForm = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet/BaseInfoForm'));

const SelectPlatform = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet/SelectPlatform'));

const SelectProject = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet/SelectProject'));

const SelectTrainType = lazy(() => import('@src/views/DataSet/CreateDataSet/OtherDataSet/SelectTrainType'));

export default {
  path: APP_THIRDPARTY,
  strict: true,
  element: SuspenseFn(OtherDataSet),
  children: [
    // 仅有头部任务的
    {
      path: APP_THIRDPARTY_SelectTrainType,
      element: SuspenseFn(SelectTrainType),

    },
    {
      path: APP_THIRDPARTY_STEP_1,
      element: SuspenseFn(SelectPlatform),

    },
    {
      path: APP_THIRDPARTY_STEP_2,
      element: SuspenseFn(SelectProject),

    },

    {
      path: APP_THIRDPARTY_STEP_3,
      element: SuspenseFn(BaseInfoForm),

    },

    {
      path: APP_THIRDPARTY_STEP_4,
      element: SuspenseFn(AfterCreate),

    },
    // 有步骤条的

    {
      path: '*',
      element: SuspenseFn(NotFound),
    },

  ]
}
