import Title from '../common/Title'
import AsLink from '../common/AsLink'
import { Form, Input } from 'antd';
import { GButton } from '@src/UIComponents'
import api from '@api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginForm.module.less'

const LoginForm = (props: any): JSX.Element => {
  const { setActive } = props
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem('login-username')
    if (username) {
      form.setFieldsValue({
        username
      })
    }
  }, [form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res: any = await api.post('/v1/login', values);

      setLoading(false)
      if (res.code === 0) {
        const { data } = res
        localStorage.setItem('login-username', data.username)
        // cookieUtils.setCookie('userInfo', userInfo, Infinity)
        data?.token && localStorage.setItem('token', data?.token);
        window.location.pathname = '/app/guide'
        // navigate({
        //   pathname: '/'
        // })
      } else {
        const errorMsg = res.message || '登录失败！'
        setErrMsg(errorMsg)
      }
    } catch (e) {
      // navigate({
      //   pathname: '/'
      // })
    }
  };
  return (
    <div styleName='LoginForm' >
      <Title text='登录' errText={errMsg} />

      <div className='custom_container'>
        <Form
          form={form}
          name='login'
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入昵称或手机号' }]}
          >
            <Input placeholder='请输入昵称或手机号' size='middle' autoComplete='off' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='请输入密码' size='middle' autoComplete='off' />
          </Form.Item>

          <div className='some_opreations'>
            <AsLink text='忘记密码' onClick={() => setActive('ForgetPasswordFrom')} />
          </div>

          <Form.Item noStyle>
            <GButton type='primary' htmlType='submit' className='login_btn' onClick={handleSubmit} loading={isLoading}>
              登 录
            </GButton>
            <GButton type='default' className='login_btn' onClick={() => setActive('RegisterFrom')}>
              注册
            </GButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
