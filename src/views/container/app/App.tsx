import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { APP_LOGIN } from '@router'
import { getUserInfo } from '@reducer/globalSlice'

import Qs from 'qs'

import './app.module.less'
import { RootState } from '@reducer'
import { isEmpty } from 'lodash'
import { useAtom } from 'jotai'
import { authUserInfoAtom } from '@src/store/user'
// 可以在这里做登录拦截或者其他
//
import styled from 'styled-components'
import GddiChat from '@src/components/GddiChat'

const ChatWrap = styled.div`
  position: fixed;
  bottom: 56px;
  right: 8px;
`

const App = () => {
  const _location = useLocation()
  const disPatch = useDispatch()
  const [, setUserInfo] = useAtom(authUserInfoAtom)

  const isLogin = !!localStorage.getItem('token');

  const { pathname, search } = _location

  const userInfo: User.Instance | null =
    useSelector((state: RootState) => state.globalSlice.userInfo) as User.Instance || null

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

  React.useEffect(
    () => {
      setUserInfo(isEmpty(userInfo) ? null : userInfo)
    },
    [userInfo]
  )

  return (
    <div styleName='app'>

      {/* {getView()} */}
      <Outlet />
      {/* HOTFIX: HIDE CHAT ROBOT CAUSE BY API BROKEN*/}
      {/* <ChatWrap> */}
      {/*   <GddiChat */}
      {/*     chatStreamURL='/robot/openai/v1/chat/completions' */}
      {/*     ratingURL='/robot/openai/v1/mark' */}
      {/*     getHeaders={() => ({ */}
      {/*       Authentication: `${localStorage.getItem('token')}`, */}
      {/*       Token: `${localStorage.getItem('token')}`, */}
      {/*       "X-App-Id": (window as any).globalConfig.app.id, */}
      {/*       "X-App-Key": (window as any).globalConfig.app.key, */}
      {/*     })} */}
      {/*   /> */}
      {/* </ChatWrap> */}
    </div>
  )
}
export default App
