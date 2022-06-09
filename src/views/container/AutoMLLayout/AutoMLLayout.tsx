import { Outlet, useLocation } from 'react-router-dom';
import NavLinkBar from './NavLinkBar'

import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  const location = useLocation()
  console.log(location.pathname, 'location.pathname')
  return (
    <div styleName='AutoMLLayout'>
      <NavLinkBar/>
      <Outlet />
    </div>
  )
}

export default AutoMLLayout
