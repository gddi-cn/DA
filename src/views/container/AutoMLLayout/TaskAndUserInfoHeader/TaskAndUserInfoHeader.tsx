import { ReactComponent as Logo } from '@src/asset/images/logo.svg'
import TaskList from './TaskList'
import UserCenter from './UserCenter'

import './TaskAndUserInfoHeader.module.less'

const TaskAndUserInfoHeader = (): JSX.Element => {
  return (
    <div styleName='TaskAndUserInfoHeader'>
      <div className='logo_wrap'>
        <Logo className='logo'/>
      </div>
      <div className='task_list_wrap'>
        <TaskList/>
      </div>
      <div className='user_wrap '>
        <UserCenter/>
      </div>
    </div>
  )
}

export default TaskAndUserInfoHeader
