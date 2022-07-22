
// import { Redirect } from 'react-router-dom';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { APP_LOGIN } from '@router'
import { getUserInfo } from '@reducer/globalSlice'

import Qs from 'qs'
// import { useSocketSyncUpdate } from '@src/views/ghooks'
// import { Spin } from 'antd';

import './app.module.less'
// import api from '../api'
// 可以在这里做登录拦截或者其他

const App = () => {
  const _location = useLocation()
  const disPatch = useDispatch()

  const isLogin = !!localStorage.getItem('token');

  const { pathname, search } = _location

  // const [loading] = useSocketSyncUpdate()
  // useSocketSyncUpdate()
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

  // const getView = () => {
  //   if (loading) {
  //     return (
  //       <div className='transition_div'>
  //         <Spin tip='数据加载中' />
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <Outlet />
  //     )
  //   }
  // }
  return (
    <div styleName='app'>

      {/* {getView()} */}
      <Outlet />
    </div>
  )
}
export default App
