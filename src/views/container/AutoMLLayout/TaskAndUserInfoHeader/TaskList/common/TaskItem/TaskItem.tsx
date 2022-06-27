
import { Popover } from 'antd'
import { taskListItem, subTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import TaskItemPopover from '../TaskItemPopover'
import './TaskItem.module.less'

type Props = {
  data: taskListItem
}

const TaskItem = (props: Props): JSX.Element => {
  const dispatch = useDispatch()
  const { data } = props
  const {
    model, reactKey
  } = data
  // 类似UUID
  // console.log(reactKey)
  const handleOnClick = useDebounceFn(() => {
    dispatch(subTask({ reactKey }))
  }, { wait: 0 })

  return (

    <div styleName='TaskItem'>
      <Popover content={<TaskItemPopover />} mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className='TaskItem_wrap'>
          <p className='task_name'>
            {model?.taskName || '未命名'}
          </p>
          <div className='opration_wrap' onClick={handleOnClick.run}>
            <p>隐藏</p>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default TaskItem
