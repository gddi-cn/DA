// 全局任务TASK的RKT

// 奇奇怪怪的

// 目前来看就是头部几个能影响到这个、不过数据更新是很庞大的、毕竟设计整个流程

import { createSlice, createAction } from '@reduxjs/toolkit'
// createAction
import fn from './fn'

const localName = 'tasksSilce'

// type TaskInfo={
//     // 任务名字、初始化未命名
//     taskName?:string,
//     reactKey?:string
// }

// 里边存啥我也不知道，一般来讲ID+版本ID就够了
export type taskListItem={
    // 数据的信息
    dataset:any,
    // 训练的信息
    model: any,
    // 部署的信息
    deploy: any,
    // 任务信息、名字或者其他需要保存的
    // task: TaskInfo,
    reactKey?: string
}
export type TaskState = {
    taskList: Array<taskListItem>,
    activeTaskIndex:number,
    activeTaskInfo: taskListItem,
    activeStep: keyof taskListItem,
}

const initialState: TaskState = {
  // 这些开始都是空的
  taskList: [],
  // 当前激活任务的index，方便做激活状态吧
  activeTaskIndex: 0,
  // 激活任务项数据、方便后边取
  activeTaskInfo: {
    dataset: {},
    model: {},
    deploy: {},
  },
  activeStep: 'dataset'
}

const tasksSilce = createSlice({
  name: localName,
  initialState,
  reducers: fn,
})

const { actions } = tasksSilce
const {
  addTask, subTask
} = actions

// 好像不见得需要初始化、留着吧
const getTaskList = createAction<any>(`${localName}/getTaskList`)

export {
  getTaskList,
  // 添加任务
  addTask,
  // 减去一个任务
  subTask
}

export default tasksSilce.reducer
