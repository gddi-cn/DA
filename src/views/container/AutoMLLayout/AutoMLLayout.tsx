import { Outlet } from 'react-router-dom';
import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  return (
    <div styleName='AutoMLLayout'>
      <div>我是头</div>
      <Outlet/>
    </div>
  )
}

export default AutoMLLayout
