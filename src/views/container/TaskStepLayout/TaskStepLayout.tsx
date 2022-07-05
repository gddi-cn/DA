
import TaskStep from './TaskStep'

import { APP_GUIDE_PAGE } from '@router'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';
import './TaskStepLayout.module.less'
import { useMemo } from 'react'

const TaskStepLayout = (): JSX.Element => {
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })

  const views = useMemo(() => {
    return (
      <>
        <TaskStep />
        <Outlet />
      </>
    )
  }, [])

  if (taskList.length === 0) {
    return <Navigate to={APP_GUIDE_PAGE}/>
  }

  return (
    <div styleName='TaskStepLayout'>
      {
        views
      }
    </div>
  )
}

export default TaskStepLayout
