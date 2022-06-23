
import { Avatar } from 'antd';
import './UserCenter.module.less'

const UserCenter = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='UserCenter'>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
    </div>
  )
}

export default UserCenter
