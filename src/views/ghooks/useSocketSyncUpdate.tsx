import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { saveActivePipeLine } from '@reducer/tasksSilce'
import { Ws } from './gSocket'
import { APP_DATA_SET_INDEX } from '@router'
// import * as allPaths from '@router/pathNames'
import { useNavigate, useLocation } from 'react-router-dom'
import { isNil } from 'lodash'
// 全局的sokcet更新
export const useSocketSyncUpdate = () => {
  console.log('1')
  const [loading, setLoading] = useState(false)
  const wsInstance = useRef<Ws|null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })

  const activeTaskInfo = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo
  })

  const { id } = activeTaskInfo

  useEffect(() => {
    if (isNil(activePipeLine)) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [activePipeLine])

  useEffect(() => {
    try {
      const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`

      wsInstance.current = new Ws(url)

      const TOKEN = localStorage.getItem('token') || '';
      wsInstance.current?.send(JSON.stringify({
        // AppID: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
        // AppKey: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
        // Token: TOKEN,
        action: 'login',
        data: {
          token: TOKEN
        }
      }))
      wsInstance.current.subscribe('resp', (data:any) => {
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
      console.log(e, 36363)
    }

    return () => {
      wsInstance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!loginSuccess) {
      return
    }
    if (!id) {
      return
    }
    if (wsInstance.current) {
      const _topic = `project.snap.${id}`

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
          console.log(data, 'data')
          // 这里只做保存
          dispatch(saveActivePipeLine(data))
        }
      })
    }

    return () => {
      window.globalSocketPushMsgForProject = null
    }
  }, [id, loginSuccess, dispatch, navigate])

  useEffect(() => {
  // 监听当前active task info，变化了就都发回去，也不管啥的
  // 变化可能是某个页面数据变了，也可能页面变了，反正都是要发送的，但是怎么判断这个东西变了还是要研究研究

    if (activePipeLine?.active_page) {
      if (activePipeLine?.active_page === location.pathname) {

      } else {
        navigate({
          pathname: activePipeLine?.active_page
        })
      }
    } else {
      // 不存在就去数据
      navigate({
        pathname: APP_DATA_SET_INDEX
      })
      const { globalSocketPushMsgForProject } = window
      globalSocketPushMsgForProject && globalSocketPushMsgForProject({
        active_page: APP_DATA_SET_INDEX
      })
    }
  }, [activePipeLine, navigate, location])

  useEffect(() => {
    // 接受更新
    // 如果页面不同、就navigate到页面
  }, [])

  return [loading]
}
