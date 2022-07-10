
import {
  APP_LOCAL_FILE,
  APP_LOCAL_FILE_STEP_1,
  APP_LOCAL_FILE_STEP_2,
  APP_LOCAL_FILE_STEP_3,
  APP_LOCAL_FILE_STEP_4
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'

const NotFound = lazy(() => import('@src/views/NotFound'));
const LocalDataSet = lazy(() => import('@src/views/DataSet/CreateDataSet/LocalDataSet'));

const AfterUploaded = lazy(() => import('@src/views/DataSet/CreateDataSet/LocalDataSet/AfterUploaded'));

const DatasetBaseInfoForm = lazy(() => import('@src/views/DataSet/CreateDataSet/LocalDataSet/DatasetBaseInfoForm'));

const SelectDatasetFile = lazy(() => import('@src/views/DataSet/CreateDataSet/LocalDataSet/SelectDatasetFile'));

const SelectTrainType = lazy(() => import('@src/views/DataSet/CreateDataSet/LocalDataSet/SelectTrainType'));

export default {
  path: APP_LOCAL_FILE,
  strict: true,
  element: SuspenseFn(LocalDataSet),
  children: [
    // 仅有头部任务的
    {
      path: APP_LOCAL_FILE_STEP_1,
      element: SuspenseFn(SelectTrainType),

    },
    {
      path: APP_LOCAL_FILE_STEP_2,
      element: SuspenseFn(DatasetBaseInfoForm),

    },

    {
      path: APP_LOCAL_FILE_STEP_3,
      element: SuspenseFn(SelectDatasetFile),

    },

    {
      path: APP_LOCAL_FILE_STEP_4,
      element: SuspenseFn(AfterUploaded),

    },
    // 有步骤条的

    {
      path: '*',
      element: SuspenseFn(NotFound),
    },

  ]
}
