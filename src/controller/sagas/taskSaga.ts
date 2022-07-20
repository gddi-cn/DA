import { takeLatest, put, call, select } from 'redux-saga/effects'
import {
  getTaskActiveList,
  saveTaskActiveList,
  addActiveTask,
  checkoutTask,
  hiddenActiveTask,
  visibleActiveTask
} from '@src/controller/reducer/tasksSilce'
// import { message } from 'antd'
import api from '@api'
import { RootState } from '@reducer'
import type TaskSlice from '../reducer/tasksSilce/taskSlice'
import { isEmpty } from 'lodash'

export default function* taskSaga (): Generator<any> {
  yield takeLatest(getTaskActiveList.type, fetchTaskActiveList)
  yield takeLatest(addActiveTask.type, addActiveTaskGen)
  yield takeLatest(hiddenActiveTask.type, hiddenActiveTaskGen)
  yield takeLatest(visibleActiveTask.type, visibleActiveTaskGen)
}

const findTaskIndexById = (reactKey: string, taskList: Array<TaskSlice.taskListItem>): number => {
  const index = taskList.findIndex((o) => o.id === reactKey)
  return index
}

function* fetchTaskActiveList ():any {
  try {
    const res = yield call(() => api.get('/v3/projects', {
      params: {
        status: 1,
        sort: 'asc',
        page_size: 50
      }
    }))
    if (res?.code === 0) {
      const { items } = res.data
      const list = items || []
      yield put(saveTaskActiveList(list))

      if (!isEmpty(list)) {
        const activeTaskInfo: TaskSlice.taskListItem = yield select(
          (state: RootState) => state.tasksSilce.activeTaskInfo
        )

        if (!activeTaskInfo.id) {
          const _activeInfo = list[0]
          yield put(checkoutTask(_activeInfo))
        }
      }
    } else {
      // message.warning('G了')
    }
  } catch (e) {
    console.error(e, 'fetchTaskActiveList')
  } finally {

  }
}

function* addActiveTaskGen (): any {
  try {
    const res = yield call(() => api.post('/v3/projects', {
      name: '未命名'
    }))
    if (res?.code === 0) {
    //   const { items } = res.data
      yield put(getTaskActiveList(null))
    } else {
      // message.warning('G了')
    }
  } catch (e) {
    console.error(e, 'addActiveTaskGen')
  } finally {

  }
}

function* hiddenActiveTaskGen (action: any): any {
  const { id, hasAutoNext } = action.payload
  try {
    const res = yield call(() => api.patch(`/v3/projects/${id}`, {
      status: 2
    }))

    if (hasAutoNext) {
      const taskList: TaskSlice.taskListItem[] = yield select(
        (state: RootState) => state.tasksSilce.taskList
      )
      const index = findTaskIndexById(id, taskList)
      let activeTaskInfo = {}
      if (hasAutoNext) {
        if (taskList[index + 1]) {
          activeTaskInfo = taskList[index + 1]
        } else {
          if (taskList[index - 1]) {
            activeTaskInfo = taskList[index - 1]
          }
        }
        yield put(checkoutTask(activeTaskInfo))
      }
    }
    if (res?.code === 0) {
      //   const { items } = res.data
      yield put(getTaskActiveList(null))
    } else {
      // message.warning('G了')
    }
  } catch (e) {
    console.error(e, 'hiddenActiveTaskGen')
  } finally {

  }
}

function* visibleActiveTaskGen (action: any): any {
  const { data } = action.payload
  try {
    const res = yield call(() => api.patch(`/v3/projects/${data.id}`, {
      status: 1
    }))

    if (res?.code === 0) {
      //   const { items } = res.data
      yield put(getTaskActiveList(null))
      yield put(checkoutTask(data))
    } else {
      // message.warning('G了')
    }
  } catch (e) {
    console.error(e, 'visibleActiveTaskGen')
  } finally {

  }
}
