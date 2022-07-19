
import { ReactComponent as UserIcon } from './icon/user.svg'
import { Dropdown, Menu } from 'antd';
import { APP_DEVICE_INDEX } from '@router'
import { useNavigate } from 'react-router-dom'
import './UserCenter.module.less'

const UserCenter = (): JSX.Element => {
  const navigate = useNavigate()
  const handleGoDevice = () => {
    navigate({
      pathname: APP_DEVICE_INDEX
    })
  }
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
        }
      ]}
    />
  );
  return (
    <div styleName='UserCenter'>
      <Dropdown overlay={menu} placement="bottomLeft">
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
