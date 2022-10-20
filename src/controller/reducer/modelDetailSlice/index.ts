// 全局任务TASK的RKT

// 奇奇怪怪的

// 目前来看就是头部几个能影响到这个、不过数据更新是很庞大的、毕竟设计整个流程

import { createSlice } from '@reduxjs/toolkit'
// createAction
import fn from './fn'

const localName = 'modelDetailSlice'

const initialState: ModelDetailSlice.ModelDetailSliceState = {
  id: undefined,
  versionList: [],
  currentVersion: ({} as ModelDetailSlice.VersionItem),
  versionInfo: ({} as ModelDetailSlice.VersionInfo),
}

const tasksSilce = createSlice({
  name: localName,
  initialState,
  reducers: fn,
})

const { actions } = tasksSilce
// 导出不允许直接丢啊、算了算了
const {
  setVersionList,
  setCurrentVersion,
  setVersionInfo,
  setModelId,
  initModelDetialSlice
} = actions

// 好像不见得需要初始化、留着吧
// const getTaskList = createAction<any>(`${localName}/getTaskList`)

export {
//   getTaskList,
  setCurrentVersion,
  setVersionInfo,
  setVersionList,
  setModelId,
  initModelDetialSlice
}

export default tasksSilce.reducer
