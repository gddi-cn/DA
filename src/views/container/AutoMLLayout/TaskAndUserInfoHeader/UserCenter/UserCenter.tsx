
import { ReactComponent as UserIcon } from './icon/user.svg'
import { Dropdown, Menu } from 'antd';
import { APP_DEVICE_INDEX, APP_LOGIN } from '@router'
// import api from '@api'
import './UserCenter.module.less'
import { useNavigate } from 'react-router-dom'

const UserCenter = (): JSX.Element => {
  const navigate = useNavigate()
  const handleGoDevice = () => {
    navigate({
      pathname: APP_DEVICE_INDEX
    })
  }

  const handleLoginOut = async () => {
    localStorage.removeItem('token')
    navigate({
      pathname: APP_LOGIN
    })
  }

  const items = [
    {
      key: '1',
      label: (
        <div onClick={handleGoDevice} >
          设备中心
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={handleLoginOut} >
          退出登录
        </div>
      ),
    },
  ]

  return (
    <div styleName='UserCenter'>
      <Dropdown menu={{ items }} placement="bottomLeft" >
        <div className='UserCenter_wrap'>
          <span className='icon_wrap'>
            <UserIcon />
          </span>
        </div>
      </Dropdown>

    </div>
  )
}

export default UserCenter
