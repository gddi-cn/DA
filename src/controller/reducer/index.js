import {
  // createStore,
  // applyMiddleware,
  combineReducers
} from 'redux';
import globalSlice from './globalSlice'
// const middleware = [thunk, logger];
// const test = (state: any, ac: any) => {
//   console.log(state)
//   console.log(ac)
//   return state || {}
// }
const reducers = combineReducers({
  globalSlice
  // test
});

// const store = createStore(
//   reducers,
//   applyMiddleware(...middleware)
// );

export default reducers
