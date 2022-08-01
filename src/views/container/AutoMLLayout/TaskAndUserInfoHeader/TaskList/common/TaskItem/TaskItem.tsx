
import { Popover } from 'antd'
import { hiddenActiveTask, checkoutTask, saveActivePipeLine } from '@reducer/tasksSilce'
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
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
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
    if (taskList?.length === 1) {
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
    // 去某些不在流程页面的时候需要回来，这个强推
    // 性能啥的就忽略吧，PPT就别太纠结了是吧
    dispatch(saveActivePipeLine({ ...activePipeLine }))
  }

  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)

    if (activeTaskInfo?.id === id) {
      return 'TaskItem_wrap TaskItem_active'
    }

    return 'TaskItem_wrap'
  }

  const getOunerCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)

    if (activeTaskInfo?.id === id) {
      return 'Tabs_Nav_Item_active'
    }

    return 'Tabs_Nav_Item'
  }

  const Content = useMemo(() => {
    return (
      <TaskItemDetail rawData={data} needSync={true} />
    )
  }, [data])

  const getActiveDiv = () => {
    if (activeTaskInfo?.id === id) {
      return 'inline-block'
    }
    return 'none'
  }

  return (

    <div styleName='TaskItem' className={getOunerCls()}>
      <Popover content={Content} mouseEnterDelay={0.4} title={null} placement='bottomLeft' destroyTooltipOnHide>
        <div className={getCls()} onClick={handleCheckoutTask} >
          {/* {getActiveDiv()} */}
          <div className="hori-selector" style={{ display: getActiveDiv() }}><div className="left"></div><div className="right"></div></div>
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
