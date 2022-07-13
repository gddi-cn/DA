import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react'
// import { easyWebSocket } from './easy-websocket';
import { newGetEchartListOptions } from './getEchartListOptions'
import workerScript from './worker'

export function useGetLineDataV2 ({ trainTaskId }: {
    trainTaskId?: string;

}): any {
  const [accuracyOption, setAccuracyOption] = useState<any>({
    xData: {},
    yData: {}
  })

  const [processOption, setProcessOption] = useState<any>({
    xData: {},
    yData: {},
  });

  const worker = useRef<null | Worker>(null)
  const interval = useRef<any>(null)
  const preId = useRef<any>(undefined)

  useEffect(() => {
    return () => {
      worker.current?.postMessage({ type: 'destorySocket' })
      worker.current?.terminate()
      worker.current = null
    }
  }, [])

  useEffect(() => {
    const freePostMsg = () => {
      worker.current?.postMessage({ type: 'masterIsFree' })
    }

    interval.current = setInterval(freePostMsg, 1000)
    return () => {
      interval.current && clearInterval(interval.current)
    }
  }, [])

  useEffect(() => {
    let len:any = null
    try {
      if (!trainTaskId) {
        return
      }
      if (trainTaskId !== preId.current) {
        worker.current?.postMessage({ type: 'destorySocket' })
        worker.current?.terminate()
        worker.current = null
      }
      if (!worker.current) {
        console.log('执行次数')
        worker.current = new Worker(workerScript)
      }
      preId.current = trainTaskId
      // 回调
      worker.current.onmessage = (e) => {
        // console.log(e.data, 'fuck you')
        const { type, data } = e.data;
        console.log(e.data, 115)
        if (type === 'masterIsFreeRes') {
          //
          const [newoptipnsObj, newoptipnsTestObj] = newGetEchartListOptions(data)
          const keys = Object.keys(newoptipnsObj.xData)
          if (!isEmpty(keys)) {
            const key = keys[0]

            if (len !== newoptipnsObj.xData[key].length) {
              setProcessOption(newoptipnsObj)
              setAccuracyOption(newoptipnsTestObj)
              len = newoptipnsObj.xData[key].length
            }
          }
        }
      }
      const TOKEN = localStorage.getItem('token') || '';
      const url = `${(window).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`
      worker.current.postMessage({ type: 'create', data: { id: trainTaskId, TOKEN, url } })
    } catch (e) {
      console.log(e)
    }
  }, [trainTaskId]);

  return [
    accuracyOption, processOption
  ]
}
