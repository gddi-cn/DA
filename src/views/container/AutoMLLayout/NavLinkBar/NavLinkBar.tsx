import { NavLink } from 'react-router-dom';
import {
  APP_DATA_SET_INDEX,
  APP_HOME_PAGE,
  APP_MODEL_INDEX
} from '@router'
import './NavLinkBar.module.less'

const route_info = [
  {
    pathname: APP_HOME_PAGE,
    title: '首页'
  },
  {
    pathname: APP_DATA_SET_INDEX,
    title: '数据管理'
  },
  {
    pathname: APP_MODEL_INDEX,
    title: '模型管理'
  },
]

const NavLinkBar = (): JSX.Element => {
  return (
    <div styleName='NavLinkBar'>
      {
        route_info.map((o, i:number) => {
          return (
            <NavLink key={i} to={{ pathname: o.pathname }}>
              {
                o.title
              }
            </NavLink>
          )
        })
      }
    </div>
  )
}

export default NavLinkBar
