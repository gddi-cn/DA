
import { Button, Switch } from 'antd'
import { cusTheme } from '@src/utils'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'
import './HomePage.module.less'

const less_dark = require('@src/theme/jsLib/less_dark')

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const checkout = () => {
    cusTheme(less_dark)
  }

  const checkoutRoute = () => {
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
  }
  return (
    <div styleName='HomePage'>
      <Button type='primary' onClick={checkout} className='page_btn'>?s???</Button>
      <Button type='primary' onClick={checkoutRoute} className='page_btn'>?s???</Button>
      <Switch defaultChecked />
    </div>
  )
}

export default HomePage
