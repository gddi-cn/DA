// import { getEchartListOptions } from './getEchartListOptions';

const workerCode = () => {
  // -----------------------------------------
  function easyWebSocket ({
    ws_url,
    heartbeatinterval,
    heartbeattick,
    onopen,
    wsonmessage,
  }) {
    const ws_ctx = { keep_connected: true };

    const connectWs = () => {
      try {
        const ws = new WebSocket(ws_url);

        ws.onopen = (e) => {
          if (
            heartbeattick &&
            heartbeatinterval !== undefined &&
            heartbeatinterval > 0
          ) {
            ws_ctx.heart_timer_id = setInterval(
              () => ws.readyState === ws.OPEN && heartbeattick(ws),
              heartbeatinterval
            );
          }

          onopen && onopen(ws, e);
        };
        ws.onclose = (e) => {
          if (ws_ctx.keep_connected) {
            // throttle(() => connectWs(), 5000)
            const timer = setTimeout(() => {
              connectWs()
              timer && clearTimeout(timer)
            }, 5000)
          }
          // console.log('easyWebSocket reconnect', ws_ctx.keep_connected, e);
        };
        ws.onerror = (e) => {
          // console.log(e)
        };
        ws.onmessage = (e) => wsonmessage && wsonmessage(ws, e);
        ws_ctx.ws = ws;
      } catch (error) {
        // console.warn('easyWebSocket', error);
      }
    };

    connectWs();

    return () => {
      // console.log('ws lifecycle release', ws_url);
      ws_ctx.keep_connected = false;
      ws_ctx.ws && ws_ctx.ws.close();
      self.console.log('我销毁了这个狗屎')
      // clear heart beat
      ws_ctx.heart_timer_id && clearInterval(ws_ctx.heart_timer_id);
    };
  }

  // -------------------------------------------------------------

  // eslint-disable-next-line no-var
  var lineData = []
  // eslint-disable-next-line no-var
  var hasMore = false
  // 这边应该怎么处理队列呢
  // const TOKEN = localStorage.getItem('token') || '';
  // eslint-disable-next-line no-var
  var id = null
  // eslint-disable-next-line no-var
  var socketIns = null
  onmessage = function (e) {
    const { type, data } = e.data;
    if (type === 'create') {
      id = data?.id

      socketIns = easyWebSocket({
        ws_url: data?.url,

        onopen: (ws) => {
          ws.send(JSON.stringify({

            action: 'login',
            data: {
              token: data?.TOKEN
            }
          }))
        },
        wsonmessage: (ws, msg) => {
          try {
            const { data: blobData } = msg;
            blobData.text().then((text) => {
              const { action, data, topic } = JSON.parse(text);
              if (action === 'login') {
                ws.send(JSON.stringify({
                  action: 'sub',
                  topic: `task.log.${id}`,
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
                // processFn(data)
                if (topic === 'task.log') {
                  lineData.push(data)
                  hasMore = true
                }
              }
            })
          } catch (e) {

          } finally {

          }
        },
      })
    }

    if (type === 'masterIsFree') {
      if (hasMore) {
        // const _data = getEchartListOptions(lineData)
        postMessage({
          type: 'masterIsFreeRes',
          data: lineData,
          hasMore
        })

        hasMore = false
      }
    }

    if (type === 'destorySocket') {
      socketIns()
    }

    // postMessage(arr)
  }
}

let code = workerCode.toString()
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'))

const blob = new Blob([code], { type: 'application/javascript' })

const workerText = URL.createObjectURL(blob)

export default workerText
