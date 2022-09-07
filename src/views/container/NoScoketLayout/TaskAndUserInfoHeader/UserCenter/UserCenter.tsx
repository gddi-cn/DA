
import { ReactComponent as UserIcon } from './icon/user.svg'
import { Dropdown, Menu } from 'antd';
import { APP_DEVICE_INDEX, APP_LOGIN } from '@router'
// import api from '@api'
import { useNavigate } from 'react-router-dom'
import './UserCenter.module.less'

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

  // const handleNotfunod = () => {
  //   navigate({
  //     pathname: APP_DEVICE_INDEX + '123'
  //   })
  // }
  const menu = (
    <Menu
      style={{ width: 200 }}
      items={[
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
        // {
        //   key: '3',
        //   label: (
        //     <div onClick={handleNotfunod} >
        //       404
        //     </div>
        //   ),
        // }
      ]}
    />
  );
  return (
    <div styleName='UserCenter'>
      <Dropdown overlay={menu} placement="bottomLeft" >
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
