import { Outlet } from 'react-router-dom';
import TaskAndUserInfoHeader from './TaskAndUserInfoHeader'

import './AutoMLLayout.module.less'
// import { Spin } from 'antd';

const AutoMLLayout = (): JSX.Element => {
  // const location = useLocation()
  // console.log(location.pathname, 'location.pathname')

  // const getView = () => {
  //   if (loading) {
  //     return (
  //       <div className='transition_div'>
  //         <Spin tip='数据加载中' />
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <Outlet />
  //     )
  //   }
  // }
  return (
    <div styleName='AutoMLLayout'>
      <TaskAndUserInfoHeader/>
      <Outlet />
    </div>
  )
}

export default AutoMLLayout
