
// import { Redirect } from 'react-router-dom';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import './app.module.less'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { APP_LOGIN } from '@router'
import { getUserInfo } from '@reducer/globalSlice'

import Qs from 'qs'
import { useSocketSyncUpdate } from '@src/views/ghooks'

// import api from '../api'
// 可以在这里做登录拦截或者其他

const App = () => {
  const _location = useLocation()
  const disPatch = useDispatch()

  const isLogin = !!localStorage.getItem('token');

  const { pathname, search } = _location

  useSocketSyncUpdate()

  useEffect(() => {
    if (isLogin) {
      disPatch(getUserInfo({}))
    }
  }, [disPatch, isLogin])

  if (!isLogin) {
    return (
      <Navigate
        to={{
          pathname: APP_LOGIN,
          search: Qs.stringify({ pathname, search })
        }}
      />
    )
  }

  // 避免路由匹配不上，过滤白屏
  const canNotMatch = [
    '/app',
    '/app/',

  ]
  if (canNotMatch.includes(pathname)) {
    return <Navigate to='/404' />
  }
  return (
    <div styleName='app'>

      <Outlet />

    </div>
  )
}
export default App
