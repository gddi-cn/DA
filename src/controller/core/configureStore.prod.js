import {
  createStore,
  applyMiddleware,

} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk, sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
sagaMiddleware.run(rootSaga)
export default store
