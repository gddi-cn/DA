import { Button, Form as AntForm, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { usePassword } from './hook'
import Dialog from '@src/components/Dialog'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

const Btn = styled(Button)`
  padding: 4px 0;
`

const Container = styled.div`
  padding: 96px 0 116px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled(AntForm)`
  width: 436px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`

const Footer = styled.div`
  position: absolute;
  right: 40px;
  bottom: 16px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`

const Password: React.FC = () => {
  const { open, handleOpen, handleClose, form, loading, handleUpdate } = usePassword()

  return (
    <div>
      <Btn type='link' onClick={handleOpen}>
        修改密码
      </Btn>
      <Dialog
        open={open}
        onCancel={handleClose}
        title={'修改密码'}
        width={1400}
        destroyOnClose
      >
        <Container>
          <Form form={form} layout='vertical' preserve={false}>
            <Form.Item
              name='op'
              label='旧密码'
              required
              rules={[
                { required: true, message: '请输入旧密码' },
              ]}
            >
              <Input.Password autoFocus />
            </Form.Item>
            <Form.Item
              name='np'
              label='新密码'
              required
              validateFirst
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 8, message: '密码长度至少为 8 位字符' },
                { max: 20, message: '密码长度至多为 20 位字符' },
              ]}
            >
              <Input.Password autoFocus />
            </Form.Item>
            <Form.Item
              name='cp'
              label='确认新密码'
              dependencies={['np']}
              required
              validateFirst
              rules={[
                { required: true, message: '请确认新密码' },
                { min: 8, message: '密码长度至少为 8 位字符' },
                { max: 20, message: '密码长度至多为 20 位字符' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('np') === value)
                      return Promise.resolve()
                    
                      return Promise.reject('两次输入的密码不一致')
                  }
                })
              ]}
            >
              <Input.Password autoFocus />
            </Form.Item>
          </Form>
          <Footer>
            <SecondaryBtn width={97} onClick={handleClose}>取消</SecondaryBtn>
            <PrimaryBtn width={97} loading={loading} onClick={handleUpdate} >确定</PrimaryBtn>
          </Footer>
        </Container>
      </Dialog>
    </div>
  )
}

export default Password
