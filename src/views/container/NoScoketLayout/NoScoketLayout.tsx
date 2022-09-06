import { Outlet } from 'react-router-dom';

import './NoScoketLayout.module.less'

// 给设备中心或者个人中心准备的layout，设计是奇怪了点

const NoScoketLayout = (): JSX.Element => {
  // if (taskList.length === 0) {
  //   return <Navigate to={APP_GUIDE_PAGE}/>
  // }
  return (
    <div styleName='NoScoketLayout'>

      <Outlet />
    </div>
  )
}

export default NoScoketLayout
