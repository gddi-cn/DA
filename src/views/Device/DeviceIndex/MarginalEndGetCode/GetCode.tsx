import React, { useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import api from '@api'
import './GetCode.module.less'

const GetCode = (props:any): JSX.Element => {
  const { groupSelected } = props
  const [textCode, setTextCode] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log(groupSelected)
    const fn = async () => {
      try {
        setLoading(true)
        const res = await api.get('/v3/device/auth_code', {
          params: {
            group: groupSelected
          }
        })
        if (res.code === 0) {
          setTextCode(res.data)
          setLoading(false)

          navigator?.clipboard?.writeText(res.data).then(function () {
            message.success('已复制到粘贴板')
          }, function () {
            console.error('Unable to write to clipboard. :-(');
          });
        }
      } catch (e) {
        console.log(e)
      }
    }
    fn()
  }, [groupSelected])
  return (
    <div styleName='GetCode'>
      <Spin tip='正在生成注册码' spinning={loading}>
        <span className='code_text'>{textCode}</span>
      </Spin>
    </div>
  )
}

export default GetCode
