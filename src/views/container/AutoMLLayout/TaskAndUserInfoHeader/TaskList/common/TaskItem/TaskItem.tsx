
import { Popover } from 'antd'
import {
  hiddenActiveTask,
  checkoutTask,
  saveActivePipeLine,
  saveActivePipeLineLoading
} from '@reducer/tasksSilce'

import { useDispatch, useSelector } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import { RootState } from '@reducer/index'
import TaskItemDetail from '../TaskItemDetail'
import { useNavigate } from 'react-router-dom'

import './TaskItem.module.less'
import { useMemo } from 'react'
import { isNil } from 'lodash'

import detection from '@src/asset/images/taskItem/detection.png'
import classify from '@src/asset/images/taskItem/classify.png'
import cityscapes from '@src/asset/images/taskItem/cityscapes.png'
import pose from '@src/asset/images/taskItem/pose.png'
import car_pose from '@src/asset/images/taskItem/car_pose.png'
import keypoints_base_action from '@src/asset/images/taskItem/keypoint_base_action.png'
import keypoints_detection from '@src/asset/images/taskItem/keypoints_detection.png'
import image_retrieval from '@src/asset/images/taskItem/image_retrieval.png'

import { DatasetScene } from '@src/shared/enum/dataset'
import styled from 'styled-components'

type Props = {
  data: TaskSlice.taskListItem,
}

const Img = styled.img`
  display: block;
  height: 20px;
  width: 20px;
  object-fix: cover;
`

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
    name, id, additional,
  } = data


  const icon = useMemo(
    () => {
      const type = additional?.model_type
      if (!type) return undefined

      switch(type) {
        case DatasetScene.Detection:
          return detection
        case DatasetScene.Classify:
          return classify
        case DatasetScene.CityscapesSegment:
          return cityscapes
        case DatasetScene.PoseDetection:
          return pose
        case DatasetScene.CarPoseDetection:
          return car_pose
        case DatasetScene.KeyPointsBasedAction:
          return keypoints_base_action
        case DatasetScene.KeypointsDetection:
          return keypoints_detection
        case DatasetScene.ImageRetrieval:
          return image_retrieval
        default:
          return undefined
      }
    },
    [additional]
  )

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
    dispatch(saveActivePipeLineLoading(true))
    dispatch(checkoutTask(data))
    const timer = setTimeout(() => {
      clearTimeout(timer)
      dispatch(saveActivePipeLineLoading(false))
    }, 0)
    // 去某些不在流程页面的时候需要回来，这个强推
    // 性能啥的就忽略吧，PPT就别太纠结了是吧
    // 神奇Bug
    if (isNil(activePipeLine)) {
      return
    }
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
          <div className="hori-selector" style={{ display: getActiveDiv() }}>
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <div className='border_wrap'>
            <div className="task_icon">
              {
                icon ? (
                  <Img src={icon} />
                ) : null
              }
            </div>
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
