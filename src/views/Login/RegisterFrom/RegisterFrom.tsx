import { useEffect, useRef, useState } from 'react'

import { Col, Form, Input, message, Row } from 'antd'
import { GButton } from '@src/UIComponents'
import api from '@api'
import { validateServiceName, validateServicePhone, validateServicePwd } from '@src/utils'
import Title from '../common/Title'
import AsLink from '../common/AsLink'
import { LeftOutlined } from '@ant-design/icons'
import './RegisterFrom.module.less'

const RegisterFrom = (props: any): JSX.Element => {
  const { setActive } = props
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [num, setNum] = useState<string | number>('发送验证码');
  const timerRefs = useRef<any>(null)
  const [errMsg, setErrMsg] = useState('');

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

  const handleSubmit = async () => {

    try {
      const values = await form.validateFields()
      delete values.confirm
      setLoading(true)
      const res: any = await api.post('/v1/signup', values);
      if (res.code !== 0) {
        const errorMsg = res?.message || '注册失败！'
        setErrMsg(errorMsg)
        setLoading(false)
      } else {
        setLoading(false)
        message.success({
          content: '注册成功！',
          duration: 1,
        });
        setActive('LoginForm')
      }
    } catch (e) {
      setLoading(false)
    }
  };

  // 点击发送验证码
  const handleGetCode = async () => {
    try {
      const mobile = form.getFieldsValue().mobile
      if (mobile && (/^1[3-9]\d{9}$/.test(mobile))) {
        const getEmailCode = async (params: any): Promise<any> => {
          return await api.get('/v1/sms', {
            params: params
          })
        }
        const res = await getEmailCode({ mobile: mobile })
        if (res.code === 0) {
          message.success('发送成功，请注意查收！')
          setBtnDisabled(true)
          setNum(60)
          timerRefs.current = setInterval(() => {
            setNum((num: any) => --num)
          }, 1000)
        }
      } else {
        setErrMsg('请填写正确的手机号')
      }
    } catch (e) {

    }
  }

  const handleGoBack = () => {
    setActive('LoginForm')
    form.resetFields()
  }
  return (
    <div styleName='RegisterFrom' >
      <AsLink text={<span><LeftOutlined /> 返回登录</span>} onClick={handleGoBack} />
      <Title text='注册' errText={errMsg} />
      <Form
        form={form}
        name='register'

        scrollToFirstError
      >

        <Form.Item
          name='username'
          rules={[
            {
              validator: validateServiceName
            }
          ]}
        >
          <Input placeholder='请输入用户名!' autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              validator: validateServicePwd
            }
          ]}
        >
          <Input.Password placeholder='密码不能为空！' autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['password']}
          validateFirst
          rules={[
            { required: true, message: '请输入密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
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

        <Form.Item
          name='register_code'
          rules={[
            {
              required: true, message: '请输入邀请码!'
            }
          ]}
        >
          <Input placeholder='请输入邀请码!' autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='mobile'
          rules={[
            {
              validator: validateServicePhone
            }
          ]}
        >
          <Input placeholder='请输入手机号!' autoComplete='off' />
        </Form.Item>

        <Form.Item>
          <Row gutter={8} className='code_wrap'>
            <Col span={16}>
              <Form.Item
                name='code'
                noStyle
                rules={[{ required: true, min: 6, max: 6, message: '请输入6位邮箱验证码！' }]}
              >
                <Input placeholder='请输入短信验证码！' autoComplete='off' className='no_border' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <GButton type='default' onClick={handleGetCode} disabled={btnDisabled}>{num}</GButton>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <GButton
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            loading={isLoading}
            onClick={handleSubmit}
          >
            注册
          </GButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterFrom
