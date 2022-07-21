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
// 全局的sokcet更新
export const useSocketSyncUpdate = () => {
  const [loading, setLoading] = useState(false)
  const wsInstance = useRef<Ws|null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

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
    if (isNil(activePipeLine)) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [activePipeLine])

  useEffect(() => {
    try {
      // const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`
      const url = 'ws://api.lab.k8s.gddi.com/api/v1/ws'
      wsInstance.current = new Ws(url)

      wsInstance.current.subscribe('resp', (data:any) => {
        const { status, topic } = data

        if (topic === 'login') {
          if (status) {
            console.log('login_58', status)
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
      console.log(e, 36363)
    }

    return () => {
      console.log('我为啥要注销')
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
      window.globalSocketPushMsgForProject = (data:any) => {
        wsInstance.current?.send(JSON.stringify({
          action: 'pub',
          topic: _topic,
          data
        }))
      }

      wsInstance.current.subscribe('notice', (notice_data: any) => {
        const { topic, data } = notice_data
        if (topic === _topic) {
          console.log(data, 'subscribe_data saveActivePipeLine')
          // 这里只做保存
          dispatch(saveActivePipeLine(data))
        }
      })
    }

    return () => {
      console.log('我为啥要退出???', activeTaskInfo_id)
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
    console.log('activePipeLine', activePipeLine)
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
    // 接受更新
    // 如果页面不同、就navigate到页面
  }, [])

  return [loading]
}
