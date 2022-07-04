
import { PayloadAction } from '@reduxjs/toolkit'

const findTaskIndexById = (reactKey: string, taskList: Array<TaskSlice.taskListItem>):number => {
  const index = taskList.findIndex((o) => o.id === reactKey)
  return index
}

// 这个主要是做一些切换、删除初始化的操作
// activeTaskInfo 要对这个重新赋值、
// activeStep 要回到数据集
// activeTaskIndex 要回到被删除的最近的一位、没有就回到首页？

const initTask = (state: TaskSlice.TaskState, task: TaskSlice.taskListItem) => {
  state.activeTaskInfo = task
  // state.activeStep = 'dataset'
}

const fns = {
  // 添加
  addTask: (state: TaskSlice.TaskState, action: PayloadAction<null>) => {
    console.log(action, 'addTask')
    const taskItem: TaskSlice.taskListItem = {
      dataset: {

      },
      model: {

      },
      deploy: {},
      id: Math.random().toString(36).slice(2),
      active_page: 'select_dataset'
    }
    state.taskList.push(taskItem)
    initTask(state, taskItem)
  },
  // 删除某个
  subTask: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { id, hasAutoNext } = action.payload
    const { taskList } = state
    const index = findTaskIndexById(id, taskList)
    if (hasAutoNext) {
      state.activeTaskInfo = taskList[index - 1]
    }

    taskList.splice(index, 1)

    state.taskList = [...taskList]
    // 设置最新的任务吗？或许不用也行，不影响
  },

  // 切换任务
  // 需要初始化整个layout
  checkoutTask: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { reactKey } = action.payload
    const { taskList } = state
    const index = findTaskIndexById(reactKey, taskList)
    state.activeTaskInfo = taskList[index]
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
      state.taskList[index].task_name = modelName
      state.activeTaskInfo.task_name = modelName
    }
  },
  // 修改数据信息
  modifyTaskDataset: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { data } = action.payload
    state.taskList = data
  },
  // 修改模型信息
  modifyTaskModel: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { data } = action.payload
    state.taskList = data
  },
  // 修改部署信息
  modifyTaskDeploy: (state: TaskSlice.TaskState, action: PayloadAction<any>) => {
    const { data } = action.payload
    state.taskList = data
  },
}
export default fns
