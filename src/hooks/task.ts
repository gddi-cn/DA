import React from 'react'
import { RootState } from '@src/controller/reducer'
import { useDispatch, useSelector } from 'react-redux'
import projectAPI from '@src/apis/project'
import { checkoutTask } from '@src/controller/reducer/tasksSilce'

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

export const useCurrentTask = () => {

}
