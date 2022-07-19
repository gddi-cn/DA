
import { useEffect, useState, useRef } from 'react'
import QRCode from 'qrcode.react'
import api from '@api'
// import Qs from 'qs'
import './dynamicCode.less'

const DynamicCode = (props:any) => {
  const [url, setUrl] = useState('')
  const { group } = props

  const timer = useRef<any>(null)
  useEffect(() => {
    const getParams = async () => {
      const res = await api.get('/v3/device/auth_code', { params: { group: group } })
      console.log(res)

      if (res.code === 0) {
        const url = `https://app.desauto.cn?license=${res.data}`
        setUrl(url)

        console.warn(url)
      }
    }

    getParams()

    timer.current = setInterval(() => {
      getParams()
    }, 56000)

    return () => {
      clearInterval(timer.current)
    }
  }, [group])
  return (
    <div className='dynamicCode'>
      <QRCode value={url} size={256} />
    </div>
  )
}

export default DynamicCode
