import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo } from 'react'
import './TaskList.module.less'

const TaskList = (): JSX.Element => {
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })

  return (
    <div styleName='TaskList'>
      {
        taskList.map((o, i) => {
          return (
            <TaskItem key={i} data={o} />
          )
        })
      }
      {
        useMemo(() => {
          return <AddButton />
        }, [])
      }
    </div>
  )
}

export default TaskList
