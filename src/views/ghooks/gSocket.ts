import { message } from 'antd'

class EventCenter {
  // 通过事件类型作为属性来管理不通的事件回调
  eventStack:any = {}

  constructor () {
    this.eventStack = {}
  }

  on (eventName:any, cb:any) {
    // 只能有一个回调
    const { eventStack } = this
    eventStack[eventName] = cb

    // eventValue ? eventValue.push(cb) : eventStack[eventName] = [cb]
  }

  // once (eventName:any, cb:any) {
  //   const { eventStack } = this
  //   const eventValue = eventStack[eventName]
  //   // 利用闭包的形式 来模拟一次性监听的功能函数
  //   const tempCb = () => {
  //     let isOutOfDate = false

  //     return (data:any) => {
  //       if (isOutOfDate) return
  //       cb(data)
  //       isOutOfDate = true
  //     }
  //   }

  //   eventValue ? eventValue.push(tempCb()) : eventStack[eventName] = [tempCb()]
  // }

  off (eventName:any, cb:any) {
    const { eventStack } = this
    const eventValue = eventStack[eventName]

    if (!eventValue) return

    (eventValue || []).forEach((eventCb:any, index:any) => {
      if (eventCb === cb) {
        eventValue.splice(index, 1)
      }
    })
  }

  emit (eventName:any, data:any) {
    const { eventStack } = this
    const eventValue = eventStack[eventName]

    if (!eventValue) return

    eventValue(data)
  }
}

export class Ws {
  // 要连接的URL
  ws_url
  // 一个协议字符串或一个协议字符串数组。
  // 这些字符串用来指定子协议，这样一个服务器就可以实现多个WebSocket子协议

  // WebSocket 实例
  ws:any = null
  // 是否在重连中
  isReconnectionLoading = false
  // 延时重连的 id
  timeId:null|any = null
  // 是否是用户手动关闭连接
  isCustomClose = false
  // 错误消息队列
  errorStack:any[] = []
  // 消息管理中心
  eventCenter = new EventCenter()

  constructor (ws_url:string) {
    this.ws_url = ws_url

    this.createWs()
  }

  createWs () {
    if ('WebSocket' in window) {
      // 实例化
      this.ws = new WebSocket(this.ws_url)
      // 监听事件
      this.onopen()
      this.onerror()
      this.onclose()
      this.onmessage()
    } else {
      console.log('你的浏览器不支持 WebSocket')
    }
  }

  // 监听成功
  onopen () {
    this.ws.onopen = () => {
      const TOKEN = localStorage.getItem('token') || '';
      this.send(JSON.stringify({
        // AppID: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
        // AppKey: 'xjqwGiV5uKK5KMJj1qzJsuKQnmJ26iXDCtQSKr4xd8vOlr4gIFWbofnfWQ8eCcAc',
        // Token: TOKEN,
        action: 'login',
        data: {
          token: TOKEN
        }
      }))
      // 发送成功连接之前所发送失败的消息
      this.errorStack.forEach(message => {
        this.send(message)
      })
      this.errorStack = []
      this.isReconnectionLoading = false
    }
  }

  // 监听错误
  onerror () {
    this.ws.onerror = (err:any) => {
      console.error(err)
      message.error('当前与服务器已断开连接，请稍后再试')
      this.reconnection()
      this.isReconnectionLoading = false
    }
  }

  // 监听关闭
  onclose () {
    this.ws.onclose = () => {
      console.log('onclose')

      // 用户手动关闭的不重连
      if (this.isCustomClose) return

      this.reconnection()
      this.isReconnectionLoading = false
    }
  }

  // 接收 WebSocket 消息
  async onmessage () {
    this.ws.onmessage = (event:any) => {
      try {
        const event_data = event.data

        event_data.text().then((text:any) => {
        //   const { action, data } = JSON.parse(text);
          const data = JSON.parse(text)
          // console.log(data, 'event_data')
          this.eventCenter.emit(data.action, data)
        })
      } catch (error) {
        console.log(error, 'error')
      }
    }
  }

  // 重连
  reconnection () {
    // 防止重复
    if (this.isReconnectionLoading) return

    this.isReconnectionLoading = true
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.createWs()
    }, 3000)
  }

  // 发送消息
  send (message:any) {
    // 连接失败时的处理
    if (this.ws?.readyState !== 1) {
      this.errorStack.push(message)
      return
    }

    this.ws.send(message)
  }

  // 手动关闭
  close () {
    this.isCustomClose = true
    this.ws.close()
  }

  // 手动开启
  start () {
    this.isCustomClose = false
    this.reconnection()
  }

  // 订阅
  subscribe (eventName:any, cb:any) {
    this.eventCenter.on(eventName, cb)
  }

  // 取消订阅
  unsubscribe (eventName:any, cb:any) {
    this.eventCenter.off(eventName, cb)
  }

  // 销毁
  destroy () {
    this.close()
    this.ws = null
    this.errorStack = []
    this.eventCenter = (null as any)
  }
}
