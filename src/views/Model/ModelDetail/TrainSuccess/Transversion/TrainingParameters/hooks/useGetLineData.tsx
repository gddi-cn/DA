
import { useEffect, useRef, useState } from 'react'
import { easyWebSocket } from './easy-websocket';
import { getEchartListOptions } from './getEchartListOptions';

export function useGetLineData ({ trainTaskId }: {
    trainTaskId?: string;

}) :any {
  const TOKEN = localStorage.getItem('token') || '';

  const [accuracyOption, setAccuracyOption] = useState<any>({
    xData: {}, yData: {}
  })

  const [processOption, setProcessOption] = useState<any>({
    xData: {},
    yData: {},
  });

  const listResult = useRef<any>(null)

  useEffect(() => {
    // 这里需要一个时间切片任务调度器
    function workLoop () {
      if (listResult.current) {
        const [newoptipnsObj, newoptipnsTestObj] = listResult.current
        setProcessOption(newoptipnsObj)
        setAccuracyOption(newoptipnsTestObj)
      }

      requestAnimationFrame(workLoop);
    }

    requestAnimationFrame(workLoop);
  }, [])

  const processDataList = (dataList: any[], optipnsObj: any, optipnsTestObj: any) => {
    // 这里需要webworker去计算，不然会阻塞
    listResult.current = getEchartListOptions(dataList, optipnsObj, optipnsTestObj)

    console.log('update echarts draw', dataList.length)
    return listResult
  }

  useEffect(() => {
    let lastPushTime = Date.now();
    let lastDataArrival = Date.now();
    let cacheData: any[] = [];
    let pushtimeout: any = null;
    const optipnsObj = {
      xData: {}, yData: {}
    }
    const optipnsTestObj = {
      xData: {}, yData: {}
    }
    const renderData = (timeNow: number) => {
      processDataList(cacheData, optipnsObj, optipnsTestObj);
      cacheData = [];
      lastPushTime = timeNow;
    }

    const processFn = (visdata:any) => {
      cacheData.push(visdata);
      const dataNow = Date.now();
      const dataArrivalInterval = dataNow - lastDataArrival;
      const dataPushInterval = dataNow - lastPushTime;
      lastDataArrival = dataNow;

      // 这里应该隔一段时间采取接收信息
      // 但是不好做插值计算啊，又不知道总数，真的是cnm了
      if (dataArrivalInterval < 50 || dataPushInterval < 150) {
        pushtimeout && clearTimeout(pushtimeout);
        pushtimeout = setTimeout(() => renderData(dataNow), 200);
      } else {
        renderData(dataNow)
      }
    }

    return trainTaskId ? easyWebSocket({
      ws_url: `${(window as any).globalConfig.socket.protocol}://${window.location.host}/api/v1/ws`,
      // heartbeatinterval: 5000,
      // heartbeattick: (ws: any) =>
      //   ws.send(
      //     JSON.stringify({
      //       action: 'pong',
      //       pong: new Date().valueOf()
      //     })
      //   ),
      onopen: (ws: any) => {
        ws.send(JSON.stringify({
          // AppID: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
          // AppKey: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
          // Token: TOKEN,
          action: 'login',
          data: {
            token: TOKEN
          }
        }))
      },
      onmessage: (ws: any, msg: any) => {
        try {
          const { data: blobData } = msg;

          (
            async () => {
              const text = await (blobData as Blob).text()

              const { action, data } = JSON.parse(text);
              if (action === 'login') {
                ws.send(JSON.stringify({
                  action: 'sub',
                  topic: `task.log.${trainTaskId}`,
                  data: {
                    limit: -1
                  },
                  timestamp: new Date().valueOf()
                }))
              }
              if (action === 'ping') {
                ws.send(JSON.stringify({
                  action: 'pong',

                  pong: new Date().valueOf()
                }))
              }
              if (action === 'notice') {
                processFn(data)
              }
            }
          )()
        } catch (error) {
          console.log(error)
        }
      },
    }) : undefined
  }, [trainTaskId, TOKEN]);

  return [accuracyOption, processOption]
}
