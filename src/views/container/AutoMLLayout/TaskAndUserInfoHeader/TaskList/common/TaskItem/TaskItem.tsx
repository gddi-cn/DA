
import { Popover } from 'antd'
import { hiddenActiveTask, checkoutTask } from '@reducer/tasksSilce'
import { useDispatch, useSelector } from 'react-redux'
// import { useDebounceFn } from 'ahooks'
import { CloseOutlined } from '@ant-design/icons'
import { RootState } from '@reducer/index'
import TaskItemDetail from '../TaskItemDetail'
import { useNavigate } from 'react-router-dom'

// import type { Dispatch, SetStateAction } from 'react'
import './TaskItem.module.less'
import { useMemo } from 'react'

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
    name, id
  } = data

  // 隐藏选项、如果没有了就回到首页
  const handleOnClick = (e:any) => {
    console.log(e)
    let hasAutoNext = false

    if (activeTaskInfo?.id === id) {
      hasAutoNext = true
    }
    dispatch(hiddenActiveTask({ id, hasAutoNext }))

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

  const handleCheckoutTask = () => {
    console.log(1)
    dispatch(checkoutTask(data))
  }

  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)

    if (activeTaskInfo?.id === id) {
      return 'TaskItem_wrap TaskItem_active'
    }

    return 'TaskItem_wrap'
  }

  const Content = useMemo(() => {
    return (
      <TaskItemDetail data={data} />
    )
  }, [data])

  return (

    <div styleName='TaskItem' className=''>
      <Popover content={Content} mouseEnterDelay={0.4} title={null} placement='bottomLeft' >
        <div className={getCls()} onClick={handleCheckoutTask} >
          <div className='border_wrap'>
            <div className='task_name'>
              {name || id}

            </div>
            <CloseOutlined onClick={handleOnClick} className='opration_wrap' />
          </div>

        </div>
      </Popover>
    </div>
  )
}

export default TaskItem
