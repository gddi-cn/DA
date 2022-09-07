import { ReactComponent as Logo } from '@src/asset/images/logo.svg'

import UserCenter from './UserCenter'

import { useNavigate } from 'react-router-dom'
import { APP_GUIDE_PAGE } from '@router'
import './TaskAndUserInfoHeader.module.less'

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
        <div className="hori-selector" ><div className="left"></div><div className="right"></div></div>
      </div>
      <div className='task_list_wrap'>

      </div>
      <div className='user_wrap '>

      </div>
      <div className='user_wrap '>
        <UserCenter/>
      </div>
    </div>
  )
}

export default TaskAndUserInfoHeader
