import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { useEffect, useMemo } from 'react'
import { getTaskActiveList } from '@reducer/tasksSilce'
// import api from '@api'
// import { TabsNav } from '@src/UIComponents'
import { APP_GUIDE_PAGE } from '@router'
import { useNavigate } from 'react-router-dom'
import './TaskList.module.less'
import { isEmpty } from 'lodash'

const TaskList = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTaskActiveList({ notInit: true }))
  }, [dispatch])

  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })
  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })
  const getActiveNode = (data:TaskSlice.taskListItem) => {
    return activeTaskInfo?.id === data?.id
  }

  useEffect(() => {
    if (isEmpty(taskList)) {
      navigate({
        pathname: APP_GUIDE_PAGE
      })
    }
  }, [navigate, taskList])

  const Add_tbn = useMemo(() => {
    return <AddButton />
  }, [])

  return (
    <div styleName='TaskList'>
      {
        Add_tbn
      }
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
