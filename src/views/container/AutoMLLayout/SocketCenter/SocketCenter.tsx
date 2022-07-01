
import { useEffect } from 'react'
import './SocketCenter.module.less'

const SocketCenter = (): JSX.Element => {
  useEffect(() => {
    console.log('1')
    // initsocket
    // 依赖task_id，这个变了就更换链接
    // 或者不用，我带上ID返回去，只存在一个socket
  }, [])
  return (
    <div styleName='SocketCenter'>
          SocketCenter
    </div>
  )
}

export default SocketCenter
