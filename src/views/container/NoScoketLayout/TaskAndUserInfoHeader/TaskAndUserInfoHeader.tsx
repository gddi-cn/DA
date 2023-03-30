import { ReactComponent as Logo } from '@src/asset/images/logo.svg'
import { ArrowLeftOutlined } from '@ant-design/icons'


import { useNavigate } from 'react-router-dom'
import { APP_GUIDE_PAGE } from '@router'
import './TaskAndUserInfoHeader.module.less'

import AuthUser from '@src/components/AuthUser'

const TaskAndUserInfoHeader = (): JSX.Element => {
  const naviagte = useNavigate()

  const gotoGuide = () => {
    naviagte({
      pathname: APP_GUIDE_PAGE
    })
  }

  return (
    <div styleName='TaskAndUserInfoHeader' className={'space_header'}>
      <div className='logo_wrap' onClick={gotoGuide} title={'返回'}>
        <ArrowLeftOutlined size={48} />
      </div>
      <AuthUser />
    </div>
  )
}

export default TaskAndUserInfoHeader
