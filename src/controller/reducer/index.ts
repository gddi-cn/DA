import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'
import tasksSilce from './tasksSilce'
// const middleware = [thunk, logger];
// const test = (state: any, ac: any) => {
//   console.log(state)
//   console.log(ac)
//   return state || {}
// }
const rootReducer = combineReducers({
  globalSlice,
  tasksSilce
  // test
});
export type RootState = ReturnType<typeof rootReducer>
// const store = createStore(
//   reducers,
//   applyMiddleware(...middleware)
// );

export default rootReducer
