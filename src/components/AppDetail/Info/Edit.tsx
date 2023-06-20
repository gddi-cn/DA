import React from 'react'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import { ReactComponent as EditIcon } from '../icons/edit.svg'
import renameLogo from '../images/rename_logo.png'
import { useEdit } from './hook'
import Dialog from '@src/components/Dialog'
import { PrimaryBtn, SecondaryBtn } from '@src/components/Button'

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const Content = styled.div`
  height: 504px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
`

const Footer = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

const Img = styled.img`
  display: block;
  width: 250px;
  height: 200px;
  object-fit: cover;
`

const Edit: React.FC = () => {
  const {
    form,
    loading,
    open,
    handleOpen,
    handleCancel,
    handleUpdate,
  } = useEdit()

  return (
    <>
      <Btn
        icon={<EditIcon />}
        type={'text'}
        size={'large'}
        onClick={handleOpen}
      >
        编辑
      </Btn>
      <Dialog
        open={open}
        onCancel={handleCancel}
        title='编辑应用'
        width={1400}
        centered={false}
        destroyOnClose
      >
        <Content>
          <Img src={renameLogo} alt='rename' />
          <Form
            form={form} style={{ width: 446 }}
            preserve={false}
            labelCol={{ span: 5 }}
          >
            <Form.Item
              required
              name='name'
              label='应用名称'
              rules={[
                { required: true, message: '请输入用户名称' },
              ]}
            >
              <Input autoComplete='off' autoFocus />
            </Form.Item>
            <Form.Item
              name='description'
              label='应用描述'
              rules={[
                { max: 256, message: '应用描述不能长于 256 个字符' }
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Content>
        <Footer>
          <SecondaryBtn width={97} onClick={handleCancel} disabled={loading}>
            取消
          </SecondaryBtn>
          <PrimaryBtn width={97} onClick={handleUpdate} loading={loading}>
            修改
          </PrimaryBtn>
        </Footer>
      </Dialog>
    </>
  )
}

export default Edit

