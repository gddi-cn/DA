import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { useEffect, useMemo } from 'react'
import { getTaskActiveList } from '@reducer/tasksSilce'
// import api from '@api'
// import { TabsNav } from '@src/UIComponents'

import './TaskList.module.less'

// import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

const TaskList = (): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTaskActiveList({ notInit: true }))
  }, [dispatch])

  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })
  // const activeTaskInfo = useSelector((state: RootState) => {
  //   return state.tasksSilce.activeTaskInfo
  // })
  // const getActiveNode = (data:TaskSlice.taskListItem) => {
  //   return activeTaskInfo?.id === data?.id
  // }

  const Add_tbn = useMemo(() => {
    return <AddButton />
  }, [])

  return (
    <div styleName='TaskList'>

      {
        taskList?.map((data) => {
          return (
            <TaskItem
              key={data?.id}
              data={data}
            />
          )
        })
      }
      {
        Add_tbn
      }
      {/* <TabsNav
        dataList={taskList || []}
        renderItem={
          (data) => (
            <TaskItem

              data={data}
            />
          )
        }
        getActiveNode={getActiveNode}
      /> */}

    </div>
  )
}

export default TaskList
