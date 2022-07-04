// 全局任务TASK的RKT

// 奇奇怪怪的

// 目前来看就是头部几个能影响到这个、不过数据更新是很庞大的、毕竟设计整个流程

import { createSlice, createAction } from '@reduxjs/toolkit'
// createAction
import fn from './fn'

const localName = 'tasksSilce'

const initialState: TaskSlice.TaskState = {
  // 这些开始都是空的
  taskList: [],
  // 激活任务项数据、方便后边取
  activeTaskInfo: {
    dataset: {},
    model: {},
    deploy: {},
    id: '',
    active_page: 'select_dataset',
    pipeline: {

    }
  },

}

const tasksSilce = createSlice({
  name: localName,
  initialState,
  reducers: fn,
})

const { actions } = tasksSilce
// 导出不允许直接丢啊、算了算了
const {
  addTask, subTask, modifyTaskName, checkoutTask
} = actions

// 好像不见得需要初始化、留着吧
const getTaskList = createAction<any>(`${localName}/getTaskList`)

export {
  getTaskList,
  // 添加任务
  addTask,
  // 减去一个任务
  subTask,
  modifyTaskName,
  checkoutTask
}

export default tasksSilce.reducer
