
import { Popover } from 'antd'
import { subTask, checkoutTask } from '@reducer/tasksSilce'
import { useDispatch, useSelector } from 'react-redux'
// import { useDebounceFn } from 'ahooks'
import { RootState } from '@reducer/index'
import TaskItemPopover from '../TaskItemPopover'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'

// import type { Dispatch, SetStateAction } from 'react'
import './TaskItem.module.less'

type Props = {
  data: TaskSlice.taskListItem,
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
    task_name, id
  } = data

  // 隐藏选项、如果没有了就回到首页
  const handleOnClick = (e:any) => {
    console.log(e)
    let hasAutoNext = false

    if (activeTaskInfo.id === id) {
      hasAutoNext = true
    }
    dispatch(subTask({ id, hasAutoNext }))

    // 只有一个的时候意味着next为0、就直接回去首页了
    if (taskList.length === 1) {
      navigate({
        pathname: '/'
      })
    }
    if (e) {
      e?.preventDefault();
      e?.stopPropagation();
    }
  }

  const handleCheckoutTask = (uuid: string) => {
    console.log(1)
    dispatch(checkoutTask({ reactKey: uuid }))
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
  }

  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)

    if (activeTaskInfo?.id === id) {
      return 'TaskItem_wrap TaskItem_active'
    }

    return 'TaskItem_wrap'
  }

  return (

    <div styleName='TaskItem'>
      <Popover content={<TaskItemPopover />} mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className={getCls()} onClick={() => handleCheckoutTask(id)} >
          <div className='border_wrap'>
            <p className='task_name'>
              {task_name || id}
            </p>
            <div className='opration_wrap' onClick={handleOnClick}>
              <p>隐藏</p>
            </div>
          </div>

        </div>
      </Popover>
    </div>
  )
}

export default TaskItem
