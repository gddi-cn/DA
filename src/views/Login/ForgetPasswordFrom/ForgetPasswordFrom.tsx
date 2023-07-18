
import { Form, Input, Row, Col, message } from 'antd';
import { useState, useRef, useEffect } from 'react'
import api from '@api'
import { GButton } from '@src/UIComponents'
import Title from '../common/Title'
import AsLink from '../common/AsLink'
import { LeftOutlined } from '@ant-design/icons'
import './ForgetPasswordFrom.module.less'

const ForgetPasswordFrom = (props: any): JSX.Element => {
  const { setActive } = props
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [num, setNum] = useState<string | number>('发送验证码');
  const [errMsg, setErrMsg] = useState('');
  const timerRefs = useRef<any>(null)

  useEffect(() => {
    if (num <= 0) {
      setNum('重新发送')
      setBtnDisabled(false)
      clearInterval(timerRefs.current)
    }
  }, [num])

  useEffect(() => {
    return () => {
      clearInterval(timerRefs.current)
    }
  }, [])
  // 点击发送验证码
  const handleGetCode = async () => {
    try {
      const username = form.getFieldsValue().username
      if (username) {
        const res: any = await api.get('/v1/sms', { params: { username } })
        if (res?.code === 0) {
          message.success('发送成功，请注意查收！')
          setBtnDisabled(true)
          setNum(60)
          timerRefs.current = setInterval(() => {
            setNum((num: any) => --num)
          }, 1000)
        } else {
          setErrMsg(res?.message || '')
        }
      } else {
        setErrMsg('请填写正确的手机号！')
      }
    } catch (e) {

    }
  }

  const handleSubmit = async () => {
    try {
      const values: any = await form.validateFields()
      console.log(values)
      setLoading(true)
      const res: any = await api.post('/v1/users/reset-pwd', values);
      if (res?.code !== 0) {
        const errorMsg = res?.message || '操作失败！'
        setErrMsg(errorMsg || '')
        setLoading(false)
      } else {
        setLoading(false)
        if (res) {
          message.success('修改密码成功！')
          setActive('LoginForm')
        }
      }
    } catch (e) {
      setLoading(false)
    }
  };

  const handleGoBack = () => {
    setActive('LoginForm')
    form.resetFields()
  }

  return (
    <div styleName='ForgetPasswordFrom' >
      <AsLink text={<span><LeftOutlined /> 返回登录</span>} onClick={handleGoBack} />
      <Title text='忘记密码' errText={errMsg} />
      <Form
        form={form}

      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入昵称或手机号!' }]}
        >
          <Input placeholder='请输入昵称或手机号!' autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='new_password'
          rules={[{ required: true, min: 8, max: 20, message: '请输入8-20位密码!' }]}
        >
          <Input.Password placeholder='请输入密码!' autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['new_password']}
          validateFirst
          rules={[
            { required: true, message: '请输入8-20位密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次密码不一致！');
              },
            }),
          ]}
        >
          <Input.Password placeholder='请再次输入密码！' autoComplete='off' />
        </Form.Item>

        <Form.Item>
          <Row gutter={8} className='code_wrap'>
            <Col span={16}>
              <Form.Item
                name='code'
                noStyle
                rules={[{ required: true, min: 6, max: 6, message: '请输入6位验证码！' }]}
              >
                <Input placeholder='请输入验证码！' autoComplete='off' bordered={false} className='no_border' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <GButton type='default' className='code_btn' onClick={handleGetCode} disabled={btnDisabled}>{num}</GButton>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item noStyle>
          <div>
            <GButton type='primary' htmlType='submit' loading={isLoading} onClick={handleSubmit}>
              确 认
            </GButton>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgetPasswordFrom
