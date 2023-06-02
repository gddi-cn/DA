import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { saveActivePipeLine } from '@reducer/tasksSilce'
import { Ws } from './gSocket'
import { APP_DATA_SET_INDEX } from '@router'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import * as all_paths from '@router/pathNames'
import { useNavigate } from 'react-router-dom'
import { isNil } from 'lodash'
import { useAtom, useSetAtom } from 'jotai'
import { currentDatasetAtom, currentDatasetIdAtom, currentModelIdAtom, currentModelVersionIdAtom } from '@src/store/dataset'
// 全局的sokcet更新
export const useSocketSyncUpdate = () => {
  // const [loading, setLoading] = useState(false)
  const wsInstance = useRef<Ws | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const setCurrentDatasetId = useSetAtom(currentDatasetIdAtom)
  const setCurrentModelId = useSetAtom(currentModelIdAtom)
  const setCurrentModelVersionId = useSetAtom(currentModelVersionIdAtom)


  // const isFirst = useRef(true)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })

  const activeTaskInfo_id = useSelector((state: RootState) => {
    if (state.tasksSilce?.activeTaskInfo) {
      return state.tasksSilce.activeTaskInfo?.id
    }
    return null
  })

  useEffect(() => {
    try {
      // const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`
      const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`
      wsInstance.current = new Ws(url)

      wsInstance.current.subscribe('resp', (data: any) => {
        const { status, topic } = data

        if (topic === 'login') {
          if (status) {
            setLoginSuccess(true)
          } else {
            wsInstance.current?.close()
          }
        }
      })
      wsInstance.current.subscribe('ping', () => {
        wsInstance.current?.send(JSON.stringify({
          action: 'pong',
          pong: new Date().valueOf()
        }))
      })
    } catch (e) {
      console.error(e)
    }

    return () => {
      wsInstance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!loginSuccess) {
      return
    }
    if (!activeTaskInfo_id) {
      return
    }

    if (wsInstance.current) {
      const _topic = `project.snap.${activeTaskInfo_id}`

      wsInstance.current?.send(JSON.stringify({
        action: 'sub',
        topic: _topic,

      }))

      // 全局的推送API,这是最简单的办法了
      window.globalSocketPushMsgForProject = (data: any) => {
        wsInstance.current?.send(JSON.stringify({
          action: 'pub',
          topic: _topic,
          data
        }))
      }

      // 万恶之源
      wsInstance.current.subscribe('notice', (notice_data: any) => {
        const { topic, data } = notice_data
        const { id, version_id } = data?.APP_MODEL_TRAIN_DETAIL || {}

        if (topic === _topic) {
          setTimeout(
            () => {
              setCurrentDatasetId(data?.APP_DATASET_DETAIL?.id)
              setCurrentModelVersionId(data?.APP_MODEL_TRAIN_DETAIL?.version_id)
              setCurrentModelId(data?.APP_MODEL_TRAIN_DETAIL?.id)
            },
            100
          )
          // 这里只做保存
          dispatch(saveActivePipeLine(data))
        }
      })
    }

    return () => {
      window.globalSocketPushMsgForProject = null
      // 退订之前的东西
      const _topic = `project.snap.${activeTaskInfo_id}`
      wsInstance.current?.send(JSON.stringify({
        action: 'unsub',
        topic: _topic,
        timestamp: new Date().valueOf()
      }))
    }
  }, [activeTaskInfo_id, dispatch, loginSuccess])

  useEffect(() => {
    // 监听当前active task info，变化了就都发回去，也不管啥的
    // 变化可能是某个页面数据变了，也可能页面变了，反正都是要发送的，但是怎么判断这个东西变了还是要研究研究
    if (isNil(activePipeLine)) {
      return
    }

    if (activePipeLine?.active_page) {
      if (all_paths[activePipeLine?.active_page] === window.location.pathname) {

      } else {
        navigate({
          pathname: all_paths[activePipeLine?.active_page]
        })
      }
    } else {
      // if (window.location.pathname === APP_GUIDE_PAGE) {
      //   return
      // }
      // 不存在就去数据
      navigate({
        pathname: APP_DATA_SET_INDEX
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,

      })
    }
    // 奇怪navigate为啥会是新得依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePipeLine])

  useEffect(() => {
    // 阻止浏览器这个事件
    window.onpopstate = function() {
      if (activePipeLine) {
        socketPushMsgForProject(activePipeLine, {

        })
      }
    }
  }, [activePipeLine])

  // return [loading]
}
