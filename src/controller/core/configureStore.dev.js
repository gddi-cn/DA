import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
// import { createLogger } from 'redux-logger';
// import { Iterable } from 'immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer'
import rootSaga from '../sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))

);

sagaMiddleware.run(rootSaga)

export default store
