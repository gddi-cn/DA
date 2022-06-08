import { takeLatest, put, call } from 'redux-saga/effects'
import { saveUserInfo, getUserInfo } from '@src/controller/reducer/globalSlice'
// import { message } from 'antd'
import api from '@api'
export default function* homeSaga (): any {
  yield takeLatest(getUserInfo.type, workSaga)
}
// process-api/runtime/tasks?size=50

function* workSaga (action: any): any {
  const { params } = action.payload
  try {
    const path = '/v1/users/info'
    const res = yield call(() => api.get(path, params))
    if (res.code === 0) {
      yield put(saveUserInfo({ data: res.data }))
    } else {
      // message.warning('G了')
    }
  } catch (e) {
    console.error(e, 'fetchDemandsListSaga')
  } finally {

  }
}
