import {
  // createStore,
  // applyMiddleware,
  combineReducers
} from 'redux';
import history from '../../router/history'
import { connectRouter } from 'connected-react-router'

// const middleware = [thunk, logger];
// const test = (state: any, ac: any) => {
//   console.log(state)
//   console.log(ac)
//   return state || {}
// }
const reducers = combineReducers({
  router: connectRouter(history),

  // test
});

// const store = createStore(
//   reducers,
//   applyMiddleware(...middleware)
// );

export default reducers
