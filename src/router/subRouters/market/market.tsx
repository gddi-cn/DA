
import {
  APP_HOME_PAGE,
  APP_DATA_SET_INDEX,
  APP_MODEL_INDEX
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'
const NotFound = lazy(() => import('@src/views/NotFound'));
const App = lazy(() => import('@src/views/container/app'));
const AutoMLLayout = lazy(() => import('@src/views/container/AutoMLLayout'));
const HomePage = lazy(() => import('@src/views/HomePage'));
const DataSetIndex = lazy(() => import('@src/views/DataSet/DataSetIndex'));
const ModelIndex = lazy(() => import('@src/views/Model/ModelIndex'));

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    {
      path: '/app/',
      strict: true,
      element: SuspenseFn(AutoMLLayout),
      children: [
        {
          path: APP_HOME_PAGE,
          element: SuspenseFn(HomePage),

        },
        {
          path: APP_DATA_SET_INDEX,
          element: SuspenseFn(DataSetIndex),

        },
        {
          path: APP_MODEL_INDEX,
          element: SuspenseFn(ModelIndex),

        },

        {
          path: '*',
          element: SuspenseFn(NotFound),
        },
      ]
    },

  ]
}
