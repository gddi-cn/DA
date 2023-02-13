import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { notification } from 'antd'
import { modifyActiveTask } from '@reducer/tasksSilce'
import moment from 'moment'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useNavigate } from 'react-router-dom'
import { APP_DATASET_ANALYSE } from '@router'

import { currentDatasetAtom } from '../store'
import { useAtom } from 'jotai'
import { Dataset } from '@src/shared/types/dataset'

export const useFooter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dataset] = useAtom(currentDatasetAtom)

  const model = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.model
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const taskId = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })

  const disabled = !dataset || Boolean(model)

  const handleClick = () => {
    if (disabled) return

    const { train_set, val_set } = dataset as Dataset

    if (train_set.class_count !== val_set.class_count) return notification.error({
      message: '提示',
      duration: 3,
      description: '训练数据与测试数据标签不一致，请不全数据后再开始训练'
    })

    taskId && dispatch(modifyActiveTask({
      id: taskId,
      params: { name: moment().format('MM-DD') + '/' + dataset.name } }
    ))

    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
      APP_DATASET_ANALYSE: { id: dataset.id }
    })

    navigate(APP_DATASET_ANALYSE)
  }

  return {
    handleClick,
    disabled,
  }
}
