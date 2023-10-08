import React from 'react'
import { RootState } from '@src/controller/reducer'
import { useDispatch, useSelector } from 'react-redux'
import projectAPI from '@src/apis/project'
import {addActiveTask, checkoutTask, saveActivePipeLine, saveTaskActiveList} from '@src/controller/reducer/tasksSilce'
import { useNavigate } from 'react-router-dom'
import {APP_DATA_SET_INDEX, APP_DATASET_ANALYSE, APP_GUIDE_PAGE} from '@src/router'
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

export const useRefreshActiveTaskList = () => {
  const dispatch = useDispatch()

  return async () => {
    const { success, data } = await projectAPI.list({
      status: 1,
      sort: 'desc',
      order: 'updated',
      page: 1,
      page_size: 6,
    })

    if (!success || !data?.items) return

    dispatch(saveTaskActiveList(data.items ?? []))
  }
}

export const useCreateAndCheckoutTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const refreshTaskActiveList = useRefreshActiveTaskList()

  return async (datasetId: string, name = '未命名') => {
    navigate(APP_GUIDE_PAGE)
    const { success, data } = await projectAPI.create({ name, dataset_id: datasetId })
    if (!success || !data) return
    await refreshTaskActiveList()
    dispatch(checkoutTask(data))
    setTimeout(
      () => {
        socketPushMsgForProject({}, {
            active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
            APP_DATASET_ANALYSE: { id: datasetId },
            APP_DATASET_DETAIL: { id: datasetId }
        })
        dispatch(saveActivePipeLine({
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
          APP_DATASET_ANALYSE: { id: datasetId },
          APP_DATASET_DETAIL: { id: datasetId }
        }))

      },
      500
    )



    // const topic = `project.snap.${data.id}`
    // const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`
    //
    // if ('WebSocket' in window) {
    //   const ws = new WebSocket(url)
    //   const TOKEN = localStorage.getItem('token') || '';
    //   ws.onopen = () => {
    //     ws.send(JSON.stringify({
    //       action: 'login',
    //       data: {
    //         token: TOKEN
    //       }
    //     }))
    //     setTimeout(
    //       () => {
    //         ws.send(JSON.stringify({
    //           action: 'pub',
    //           topic,
    //           data: {
    //             active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_ANALYSE,
    //             APP_DATASET_ANALYSE: { id: datasetId },
    //             APP_DATASET_DETAIL: { id: datasetId }
    //           }
    //         }))
    //         setTimeout(
    //           () => {
    //             ws.close()
    //           }
    //         )
    //       }
    //     )
    //   }
    // } else {
    //   console.log('你的浏览器不支持 WebSocket')
    // }
  }
}
