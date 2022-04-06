
import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import {
  APP_HOME, APP_TEST
} from './pathNames'

function SuspenseFn (Comp) {
  return (
    <React.Suspense>
      <Comp />
    </React.Suspense>
  )
}

const App = React.lazy(() => import('@src/views/container/app'));
const Test = React.lazy(() => import('@src/views/test'));
const Home = React.lazy(() => import('@src/views/home'));

const routes = [

  {
    path: '/app',
    // exact: true,
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
      },
    ]
  }
]

function Routes () {
  const element = useRoutes(routes);

  // The returned element will render the entire element
  // hierarchy with all the appropriate context it needs
  console.log(element, 'element')
  return element
};

export default Routes;
