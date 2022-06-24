
import { Button, ConfigProvider, Switch } from 'antd'

import './HomePage.module.less'

const less_dark = require('@src/theme/jsLib/less_dark')

const HomePage = (): JSX.Element => {
  const checkout = () => {
    ConfigProvider.config({
      theme: less_dark,

    });
  }
  return (
    <div styleName='HomePage'>
      <Button type='primary' onClick={checkout} className='page_btn'>?s???</Button>
      <Switch defaultChecked />
    </div>
  )
}

export default HomePage
