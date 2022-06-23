
// import { Button } from 'antd'
import './TaskItem.module.less'

type Props = {
    data:any
}

const TaskItem = (props: Props): JSX.Element => {
  const { data } = props
  return (
    <div styleName='TaskItem'>
      <p className='task_name'>
        {data}
      </p>
    </div>
  )
}

export default TaskItem
