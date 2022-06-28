
import { Popover } from 'antd'
import { taskListItem, subTask, checkoutTask } from '@reducer/tasksSilce'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@reducer/index'
import TaskItemPopover from '../TaskItemPopover'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'
import './TaskItem.module.less'

type Props = {
  data: taskListItem
}

const TaskItem = (props: Props): JSX.Element => {
  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = props
  const {
    model, reactKey
  } = data

  // 隐藏选项、如果没有了就回到首页
  const handleOnClick = useDebounceFn(() => {
    dispatch(subTask({ reactKey }))
    console.log(taskList, 'taskList')
    // 只有一个的时候意味着next为0、就直接回去首页了
    if (taskList.length === 1) {
      navigate({
        pathname: '/'
      })
    }
  }, { wait: 0 })

  const handleCheckoutTask = (uuid:string) => {
    console.log(1)
    dispatch(checkoutTask({ reactKey: uuid }))
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
  }

  const getCls = () => {
    console.log(activeTaskInfo.reactKey)
    console.log(reactKey)
    if (activeTaskInfo.reactKey === reactKey) {
      return 'TaskItem_wrap TaskItem_active'
    }

    return 'TaskItem_wrap'
  }

  return (

    <div styleName='TaskItem'>
      <Popover content={<TaskItemPopover />} mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className={getCls()} onClick={() => handleCheckoutTask(reactKey)}>
          <p className='task_name'>
            {model?.modelName || '未命名'}
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
