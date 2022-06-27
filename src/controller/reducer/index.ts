import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'
import tasksSilce from './tasksSilce'

const rootReducer = combineReducers({
  globalSlice,
  tasksSilce
  // test
});
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
