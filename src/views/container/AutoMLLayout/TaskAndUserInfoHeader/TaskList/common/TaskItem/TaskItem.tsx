
import { Popover } from 'antd'
import { subTask, checkoutTask } from '@reducer/tasksSilce'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@reducer/index'
import TaskItemPopover from '../TaskItemPopover'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@router'
import { pick } from 'lodash'
import { useRef, useLayoutEffect } from 'react'
// import type { Dispatch, SetStateAction } from 'react'
import './TaskItem.module.less'

type Props = {
  data: TaskSlice.taskListItem,
  setActiveDom: any
}

const TaskItem = (props: Props): JSX.Element => {
  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })
  const taskList = useSelector((state: RootState) => {
    return state.tasksSilce.taskList
  })

  const div = useRef<HTMLDivElement|null>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, setActiveDom } = props
  const {
    task_name, id
  } = data

  useLayoutEffect(() => {
    const cls = document.getElementsByClassName('TaskItem_active')
    console.log(cls)
    const div = cls[0]
    const info = div?.getBoundingClientRect()
    if (info) {
      const style = pick(info, ['width', 'height', 'top', 'left'])
      console.log(style, 'style')
      setActiveDom(style)
    }
  }, [setActiveDom])

  // 隐藏选项、如果没有了就回到首页
  const handleOnClick = useDebounceFn(() => {
    dispatch(subTask({ id }))
    console.log(taskList, 'taskList')
    // 只有一个的时候意味着next为0、就直接回去首页了
    if (taskList.length === 1) {
      navigate({
        pathname: '/'
      })
    }
  }, { wait: 0 })

  const handleCheckoutTask = (uuid: string) => {
    console.log(1)
    dispatch(checkoutTask({ reactKey: uuid }))
    navigate({
      pathname: APP_DATA_SET_INDEX
    })
    console.log(div)
    const info = div?.current?.getBoundingClientRect()
    if (info) {
      const style = pick(info, ['width', 'height', 'top', 'left'])
      console.log(style, 'style')
      setActiveDom(style)
    }
  }

  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)
    if (activeTaskInfo.id === id) {
      return 'TaskItem_wrap TaskItem_active'
    }

    return 'TaskItem_wrap'
  }

  return (

    <div styleName='TaskItem'>
      <Popover content={<TaskItemPopover />} mouseEnterDelay={0.4} title={null} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} placement='bottomLeft'>
        <div className={getCls()} onClick={() => handleCheckoutTask(id)} ref={div}>
          <div className='border_wrap'>
            <p className='task_name'>
              {task_name || '未命名'}
            </p>
            <div className='opration_wrap' onClick={handleOnClick.run}>
              <p>隐藏</p>
            </div>
          </div>

        </div>
      </Popover>
    </div>
  )
}

export default TaskItem
