import { Outlet, useLocation } from 'react-router-dom';
import NavLinkBar from './NavLinkBar'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './AutoMLLayout.module.less'

const AutoMLLayout = (): JSX.Element => {
  const location = useLocation()
  return (
    <div styleName='AutoMLLayout'>
      <NavLinkBar/>
      <TransitionGroup className="router-wrapper">
        <CSSTransition key={location.pathname} timeout={500} classNames="fade">
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default AutoMLLayout
