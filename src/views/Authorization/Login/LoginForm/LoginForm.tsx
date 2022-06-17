
import { Form, Input, Button, message } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '@api'
// import Qs from 'qs'
import './LoginForm.module.less'

interface LoginType {
  username?: string;
  password?: string;
}

const LoginForm = (): JSX.Element => {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = useCallback(
    async (values: LoginType) => {
      try {
        setLoading(true)
        const res: any = await api.post('/v1/login', values);

        setLoading(false)

        if (res.code === 0) {
          const { data } = res
          localStorage.setItem('login-username', data.username)

          data?.token && localStorage.setItem('token', data?.token);

          const { pathname, ...rest } = Object.fromEntries(searchParams.entries())
          if (pathname) {
            setSearchParams(rest)
            navigate({
              pathname, ...rest
            })
          } else {
            navigate('/')
          }
        } else {
          const errorMsg = res.message || '登录失败！'
          message.error(errorMsg, 1.5)
        }
      } catch (e) {
        navigate('/')
      }
    }, [navigate, searchParams, setSearchParams]
  )

  return (
    <div styleName='LoginForm'>
      <h4 className='form_title'>密码登录</h4>
      <Form
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入昵称或手机号' }]}
        >
          <Input placeholder='请输入昵称或手机号' size='middle' autoComplete="off" />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' size='middle' autoComplete="off" />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
