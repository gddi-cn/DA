// 用新的东西，渐渐淘汰老旧的

import { createSlice, createAction } from '@reduxjs/toolkit'
// createAction
import fn from './fn'

const initialState = {
  // 这个后端返回
  userInfo: { },
  // 私有化的事情了、现在不一定需要、留着吧
  homePageInfo: {}
}

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: fn,
})
const { actions } = globalSlice
const {
  saveUserInfo, setHomePageInfo
} = actions

// 告诉saga开始处理请求
const getUserInfo = createAction<any>('globalSlice/getUserInfo')

export {
  getUserInfo,
  saveUserInfo,
  setHomePageInfo
}

export default globalSlice.reducer
