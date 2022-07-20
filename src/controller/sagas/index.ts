
import { all, fork } from 'redux-saga/effects';
import globalSaga from './globalSaga';
import taskSaga from './taskSaga';

function* rootSaga ():any {
  yield all([
    fork(globalSaga),
    fork(taskSaga),

  ])
}

export default rootSaga;
