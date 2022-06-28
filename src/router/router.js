
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react'

import {
  APP_LOGIN, APP_GUIDE_PAGE
} from './pathNames'

import marketRoutes from './subRouters/market'

import { SuspenseFn } from './utils'

/* 一级路由可以直接在这里写、其实在哪里都一样、为了后边代码多了不那么挫还是分类吧 */

const Login = lazy(() => import('@src/views/Authorization/Login'));
const NotFound = lazy(() => import('@src/views/NotFound'));
const Test = lazy(() => import('@src/views/test'));

const routes = [
  {
    path: '/',
    element: <Navigate to={APP_GUIDE_PAGE} replace />
  },
  {
    path: APP_LOGIN,
    element: SuspenseFn(Login),
  },
  /* 测试组件 */
  {
    path: '/test',
    element: SuspenseFn(Test),
  },
  /* 平台的路由,需要权鉴，检查登录之类 */
  marketRoutes,
  {
    path: '*',
    element: SuspenseFn(NotFound),
  },
]

function Routes () {
  const element = useRoutes(routes);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs

  return element
};

export default Routes;
