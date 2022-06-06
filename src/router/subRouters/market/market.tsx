
import {
  APP_HOME, APP_TEST, APP_HOME_ONE, APP_HOME_TWO
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'

const App = lazy(() => import('@src/views/container/app'));

const Test = lazy(() => import('@src/views/test'));
const Home = lazy(() => import('@src/views/home'));
const HomeN = lazy(() => import('@src/views/home/one'));
const HomeT = lazy(() => import('@src/views/home/two'));

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    {
      path: APP_TEST,
      element: SuspenseFn(Test),

    },
    {
      path: APP_HOME,
      element: SuspenseFn(Home),
      children: [
        {
          path: APP_HOME_ONE,
          element: SuspenseFn(HomeN),
        },
        {
          path: APP_HOME_TWO,
          element: SuspenseFn(HomeT),
        },
      ]
    },
  ]
}
