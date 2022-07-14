import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'
import tasksSilce from './tasksSilce'
import modelDetailSlice from './modelDetailSlice'

const rootReducer = combineReducers({
  globalSlice,
  tasksSilce,
  modelDetailSlice
  // test
});
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
