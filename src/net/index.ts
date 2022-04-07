
import axios, { AxiosResponse } from 'axios';

// import { history } from '@router';

import { message } from 'antd';

// axios 配置
axios.defaults.timeout = 9999999999; // 设置请求超时
axios.defaults.baseURL = '/api'; // 默认请求地址
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 请求头的设置
// axios.defaults.headers.common['X-APP-ID'] = (window as any).globalConfig.app.id;
// axios.defaults.headers.common['X-APP-KEY'] = (window as any).globalConfig.app.key;

// 请求成功的状态码数组
// const statusArr = [200, 201, 204]

// 请求
axios.interceptors.request.use(
  (config:any) => {
    const TOKEN = localStorage.getItem('token') || '';
    if (TOKEN) {
      config.headers.common.Token = TOKEN;
      config.headers.common.Authentication = TOKEN;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 返回
axios.interceptors.response.use(
  (res: AxiosResponse): Promise<any> => {
    // 拦截器配置
    // console.log(res, 'axiso')
    if (res.data) {
      return Promise.resolve(res.data);
    } else {
      // aws是没有返回值，自己加
      return Promise.resolve({
        code: 0
      });
    }
  },
  (error) => {
    // 验证是否登录信息过期

    if (error.message === 'Network Error') {
      message.error('未连接到互联网')
    }

    if (error.response?.data?.code === 400001) {
      localStorage.removeItem('token')
      //   cookieUtils.setCookie('userInfo', 0, -1)
      // history.push('/app/test')
    }

    const code = error.response?.status

    // =400不能改，s3专用
    if (code >= 400 && code < 500) {
      return Promise.resolve({
        code: -1,
        message: error.response ? error.response.data?.message : error?.message
      });
    }

    // 请求失败
    // message.error(error.response?.data?.message || intl.get('request.request_error'), 3);
    return Promise.reject(error);
  }
);

export default axios
