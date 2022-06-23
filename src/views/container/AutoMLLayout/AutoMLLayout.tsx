import { Outlet, useLocation } from 'react-router-dom';
import TaskAndUserInfoHeader from './TaskAndUserInfoHeader'

import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  const location = useLocation()
  console.log(location.pathname, 'location.pathname')
  return (
    <div styleName='AutoMLLayout'>
      <TaskAndUserInfoHeader/>
      <Outlet />
    </div>
  )
}

export default AutoMLLayout
