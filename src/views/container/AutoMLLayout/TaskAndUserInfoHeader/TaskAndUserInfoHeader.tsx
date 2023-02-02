import { ReactComponent as Logo } from '@src/asset/images/logo.svg'
import TaskList from './TaskList'
import { useNavigate } from 'react-router-dom'
import { APP_GUIDE_PAGE } from '@router'
import './TaskAndUserInfoHeader.module.less'

import AuthUser from '@src/components/AuthUser'
import TaskSearcher from './TaskSearcher'

const TaskAndUserInfoHeader = (): JSX.Element => {
  const naviagte = useNavigate()

  const gotoGuide = () => {
    naviagte({
      pathname: APP_GUIDE_PAGE
    })
  }

  return (
    <div styleName='TaskAndUserInfoHeader'>
      <div className='logo_wrap' onClick={gotoGuide}>
        <Logo className='logo' />
      </div>
      <div className='task_list_wrap'>
        <TaskList/>
      </div>
      <div className='user_wrap '>
        <TaskSearcher />
      </div>
      <AuthUser />
    </div>
  )
}

export default TaskAndUserInfoHeader
