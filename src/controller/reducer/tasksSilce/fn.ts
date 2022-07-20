
import { PayloadAction } from '@reduxjs/toolkit'

const findTaskIndexById = (reactKey: string, taskList: Array<TaskSlice.taskListItem>):number => {
  const index = taskList.findIndex((o) => o.id === reactKey)
  return index
}

// 这个主要是做一些切换、删除初始化的操作
// activeTaskInfo 要对这个重新赋值、
// activeStep 要回到数据集
// activeTaskIndex 要回到被删除的最近的一位、没有就回到首页？

// const initTask = (state: TaskSlice.TaskState, task: TaskSlice.taskListItem) => {
//   state.activeTaskInfo = task
//   // state.activeStep = 'dataset'
// }

const fns = {

  // 切换任务
  // 需要初始化整个layout
  checkoutTask: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    // const { reactKey } = action.payload
    // const { taskList } = state
    // const index = findTaskIndexById(reactKey, taskList)
    state.activeTaskInfo = action.payload
    state.activePipeLine = null
    // state.activeStep = 'dataset'
  },
  // 修改名字
  // 修改对应的key的项目、活跃项目重新赋值
  modifyTaskName: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { modelName, reactKey } = action.payload
    const { taskList } = state
    const index = findTaskIndexById(reactKey, taskList)
    console.log(index, 'index')
    if (index !== -1) {
      state.taskList[index].name = modelName
      state.activeTaskInfo.name = modelName
    }
  },

  saveTaskActiveList: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    // const { data } = action.payload
    state.taskList = action.payload
  },

  saveActivePipeLine: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    // const { data } = action.payload
    state.activePipeLine = action.payload
  },
}
export default fns
