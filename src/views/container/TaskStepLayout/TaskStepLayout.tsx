
import TaskStep from './TaskStep'

// import { APP_GUIDE_PAGE } from '@router'
// import { RootState } from '@reducer/index'
// import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'; // Navigate
import './TaskStepLayout.module.less'
import { useMemo } from 'react'

const TaskStepLayout = (): JSX.Element => {
  // const taskList = useSelector((state: RootState) => {
  //   return state.tasksSilce.taskList
  // })

  const views = useMemo(() => {
    return (
      <>
        <TaskStep />
        <div className='TaskStepLayout_views_wrap'>
          <Outlet />
        </div>
      </>
    )
  }, [])

  // if (taskList.length === 0) {
  //   return <Navigate to={APP_GUIDE_PAGE}/>
  // }

  return (
    <div styleName='TaskStepLayout'>
      {
        views
      }
    </div>
  )
}

export default TaskStepLayout
