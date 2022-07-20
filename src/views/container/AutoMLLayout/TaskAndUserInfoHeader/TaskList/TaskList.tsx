import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { useEffect, useMemo } from 'react'
import { getTaskActiveList } from '@reducer/tasksSilce'
// import api from '@api'
import { TabsNav } from '@src/UIComponents'
import './TaskList.module.less'

const TaskList = (): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTaskActiveList({}))
  }, [dispatch])

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
          (data) => (
            <TaskItem

              data={data}
            />
          )
        }
        getActiveNode={getActiveNode}
      />

    </div>
  )
}

export default TaskList
