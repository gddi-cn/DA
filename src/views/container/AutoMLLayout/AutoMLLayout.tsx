import { Outlet } from 'react-router-dom';
import TaskAndUserInfoHeader from './TaskAndUserInfoHeader'
import { useSocketSyncUpdate } from '@src/views/ghooks'
import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  // const location = useLocation()
  // console.log(location.pathname, 'location.pathname')
  useSocketSyncUpdate()
  return (
    <div styleName='AutoMLLayout'>
      <TaskAndUserInfoHeader/>
      <Outlet />
    </div>
  )
}

export default AutoMLLayout
