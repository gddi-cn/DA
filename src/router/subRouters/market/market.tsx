
import {
  APP_GUIDE_PAGE,
  APP_DATA_SET_INDEX,
  APP_MODEL_INDEX,
  APP_DATASET_DETAIL
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'
const NotFound = lazy(() => import('@src/views/NotFound'));
const App = lazy(() => import('@src/views/container/app'));
const AutoMLLayout = lazy(() => import('@src/views/container/AutoMLLayout'));
const TaskStepLayout = lazy(() => import('@src/views/container/TaskStepLayout'));
const GuideHome = lazy(() => import('@src/views/GuideHome'));
const DataSetIndex = lazy(() => import('@src/views/DataSet/DataSetIndex'));
const DataSetDetail = lazy(() => import('@src/views/DataSet/DataSetDetail'));
const ModelIndex = lazy(() => import('@src/views/Model/ModelIndex'));

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    {

      element: SuspenseFn(AutoMLLayout),
      children: [
        {
          path: APP_GUIDE_PAGE,
          element: SuspenseFn(GuideHome),

        },
        {
          path: '/app/',
          strict: true,
          element: SuspenseFn(TaskStepLayout),
          children: [
            {
              path: APP_MODEL_INDEX,
              element: SuspenseFn(ModelIndex),

            },
            {
              path: APP_DATA_SET_INDEX,
              element: SuspenseFn(DataSetIndex),

            },
            {
              path: APP_DATASET_DETAIL,
              element: SuspenseFn(DataSetDetail),

            },

            {
              path: '*',
              element: SuspenseFn(NotFound),
            },
          ]
        },
        {
          path: '*',
          element: SuspenseFn(NotFound),
        },
      ]
    },

  ]
}
