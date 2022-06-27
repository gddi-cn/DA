
import TaskStep from './TaskStep'
import TaskNameBar from './TaskNameBar'
import { Outlet } from 'react-router-dom';
import './TaskStepLayout.module.less'

const TaskStepLayout = (): JSX.Element => {
  return (
    <div styleName='TaskStepLayout'>
      <TaskNameBar />
      <TaskStep />
      <Outlet />
    </div>
  )
}

export default TaskStepLayout
