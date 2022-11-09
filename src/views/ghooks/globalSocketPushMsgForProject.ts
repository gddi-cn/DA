import TaskSlice from '@src/controller/reducer/tasksSilce/taskSlice'
import { message } from 'antd'
import { isNil } from 'lodash'

export const socketPushMsgForProject = (activePipeLine: TaskSlice.PipeLine, new_data: TaskSlice.PipeLine) => {
  try {
    if (isNil(activePipeLine)) {
      message.warning('请推送有效的信息')
      return
    }
    if (isNil(new_data)) {
      message.warning('请推送有效的信息')
      return
    }
    const { globalSocketPushMsgForProject } = window

    if (isNil(globalSocketPushMsgForProject)) {
      throw new Error('globalSocketPushMsgForProject 不存在, 请检查useSocketSyncUpdate')
    }
    const _data = Object.assign({ ...activePipeLine }, new_data)
    globalSocketPushMsgForProject(_data)
  } catch (e) {
    console.log(e)
  }
}
