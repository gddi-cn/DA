
import { PayloadAction } from '@reduxjs/toolkit'

const fns = {
  // 添加

  // 修改部署信息
  setVersionList: (state: ModelDetailSlice.ModelDetailSliceState, action: PayloadAction<any>) => {
    state.versionList = action.payload
  },

  setVersionInfo: (state: ModelDetailSlice.ModelDetailSliceState, action: PayloadAction<any>) => {
    state.versionInfo = action.payload
  },

  setCurrentVersion: (state: ModelDetailSlice.ModelDetailSliceState, action: PayloadAction<any>) => {
    state.currentVersion = action.payload
  },
  setModelId: (state: ModelDetailSlice.ModelDetailSliceState, action: PayloadAction<any>) => {
    state.id = action.payload
  },

  initModelDetialSlice: (state: ModelDetailSlice.ModelDetailSliceState) => {
    state.id = undefined
    state.versionList = []
    state.currentVersion = ({} as ModelDetailSlice.VersionItem)
    state.versionInfo = ({} as ModelDetailSlice.VersionInfo)
  },
}
export default fns
