import TaskItem from './common/TaskItem'
import AddButton from './common/AddButton'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo, useState } from 'react'
import './TaskList.module.less'
import { isEmpty } from 'lodash'

const TaskList = (): JSX.Element => {
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })

  const [activeDom, setActiveDom] = useState<any>({})

  const taskActiveMark = useMemo(() => {
    if (isEmpty(taskList)) {
      return null
    }
    return (
      <div className="hori-selector" style={activeDom}><div className="left"></div><div className="right"></div></div>
    )
  }, [activeDom, taskList])

  return (
    <div styleName='TaskList'>
      {
        useMemo(() => {
          return <AddButton />
        }, [])
      }
      {
        useMemo(() => {
          return taskList.map((o, i) => {
            return (
              <TaskItem key={i} data={o} setActiveDom={setActiveDom}/>
            )
          })
        }, [taskList])
      }
      {
        taskActiveMark
      }
    </div>
  )
}

export default TaskList
