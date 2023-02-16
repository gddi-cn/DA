import axios from 'axios'
import { message as notify } from 'antd';
import { history, APP_LOGIN } from '@router'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3e4,
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers = Object.assign(config.headers || {}, {
      Authentication: localStorage.getItem('token') || '',
      ['Content-Type']: 'application/json;charset=UTF-8',
      ['X-APP-ID']: (window as any).globalConfig.app.id,
      ['X-APP-KEY']: (window as any).globalConfig.app.key,
    })

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  res => Promise.resolve(res.data),
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const response = error.response

    if (!response) {
      notify.error('请求超时')
      return Promise.reject(error)
    }

    const { data, status } = response

    if (status === 404 || error.message === 'Network ErrorResult') {
      notify.error('未连接到互联网')
      return Promise.reject(error)
    }

    if (status === 504) {
      notify.error('请求超时')
      return Promise.reject(error)
    }

    const code = data?.code || ''
    let message = error.response.data?.message
    let isError = false

    if (/401(\d*)$/.test(code) || status === 401) {
      message = message || '登录已失效, 请重新登录'
      localStorage.removeItem('token')
      history.push(APP_LOGIN)
    }

    if (/50(\d*)$/.test(code)) {
      message = message || '系统繁忙, 请稍后再试'
      isError = true
    }

    message = message || '系统繁忙, 请稍后再试'

    isError ? notify.error(message) : notify.warning(message)

    return Promise.reject(error)
  }
)

export default axiosInstance
