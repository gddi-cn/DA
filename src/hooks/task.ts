import React from 'react'
import { RootState } from '@src/controller/reducer'
import { useDispatch, useSelector } from 'react-redux'
import projectAPI from '@src/apis/project'
import { checkoutTask } from '@src/controller/reducer/tasksSilce'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX } from '@src/router'
import { socketPushMsgForProject } from '@src/views/ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

export const useRefreshTask = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const taskId = useSelector((state: RootState) => state.tasksSilce?.activeTaskInfo?.id)
  const dispatch = useDispatch()

  return async () => {
    if (!taskId || loading) return

    setLoading(true)
    const { success, data } = await projectAPI.detail(taskId)
    setLoading(false)

    if (!success || !data) return

    dispatch(checkoutTask(data))
  }
}

export const useBack2DatasetIndex = () => {
  const navigate = useNavigate()
  const activePipeLine = useSelector((state: RootState) => 
    state.tasksSilce.activePipeLine
  ) 

  return () => {
    if (activePipeLine) {
      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX
      })
    }

    navigate(APP_DATA_SET_INDEX)
  }
}
