
import {
  APP_HOME_PAGE
} from '../../pathNames'
import { lazy } from 'react'
import { SuspenseFn } from '../../utils'
const NotFound = lazy(() => import('@src/views/NotFound'));
const App = lazy(() => import('@src/views/container/app'));

const HomePage = lazy(() => import('@src/views/HomePage'));
// const Home = lazy(() => import('@src/views/home'));
// const HomeN = lazy(() => import('@src/views/home/one'));
// const HomeT = lazy(() => import('@src/views/home/two'));

export default {
  path: '/app',
  strict: true,
  element: SuspenseFn(App),
  children: [
    {
      path: APP_HOME_PAGE,
      element: SuspenseFn(HomePage),

    },
    // {
    //   path: APP_HOME,
    //   element: SuspenseFn(Home),
    //   children: [
    //     {
    //       path: APP_HOME_ONE,
    //       element: SuspenseFn(HomeN),
    //     },
    //     {
    //       path: APP_HOME_TWO,
    //       element: SuspenseFn(HomeT),
    //     },
    //   ]
    // },
    {
      path: '*',
      element: SuspenseFn(NotFound),
    },
  ]
}
