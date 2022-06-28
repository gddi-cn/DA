import { TaskState, taskListItem } from './index'
import { PayloadAction } from '@reduxjs/toolkit'

const initTask = () => {
  console.log(1)
}
// 这个主要是做一些切换、删除初始化的操作
// activeTaskInfo 要对这个重新赋值、
// activeStep 要回到数据集
// activeTaskIndex 要回到被删除的最近的一位、没有就回到首页？

initTask()

const fns = {
  // 添加
  addTask: (state: TaskState, action: PayloadAction<null>) => {
    console.log(action, 'addTask')
    const taskItem: taskListItem = {
      dataset: {},
      model: { taskName: undefined },
      deploy: {},

      reactKey: Math.random().toString(36).slice(2)
    }
    state.taskList.push(taskItem)
  },
  // 删除某个
  subTask: (state: TaskState, action: PayloadAction<any>) => {
    console.log(action.payload)
    const { reactKey } = action.payload
    const { taskList } = state
    const index = taskList.findIndex((o) => o.reactKey === reactKey)
    taskList.splice(index, 1)
    state.taskList = [...taskList]
    // 设置最新的任务吗？或许不用也行，不影响
  },

  // 切换任务
  // 需要初始化整个layout
  checkoutTask: (state: TaskState, action: PayloadAction<any>) => {
    const { data } = action.payload
    state.taskList = data
  },
  // 修改信息、包括一系列的信息，这个操作多少有点重貌似
  modifyTask: (state: TaskState, action: PayloadAction<any>) => {
    const { data } = action.payload
    state.taskList = data
  },
}
export default fns
