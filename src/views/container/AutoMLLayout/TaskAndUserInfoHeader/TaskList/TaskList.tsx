import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo } from 'react'

import { TabsNav } from '@src/UIComponents'
import './TaskList.module.less'

const TaskList = (): JSX.Element => {
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })
  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })
  const getActiveNode = (data:TaskSlice.taskListItem) => {
    return activeTaskInfo.id === data?.id
  }

  return (
    <div styleName='TaskList'>
      {
        useMemo(() => {
          return <AddButton />
        }, [])
      }
      <TabsNav
        dataList={taskList}
        renderItem={
          (data) => <TaskItem data={data}
          />
        }
        getActiveNode={getActiveNode}
      />

    </div>
  )
}

export default TaskList
