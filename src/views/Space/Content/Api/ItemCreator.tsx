import { Form, Input, Modal } from 'antd'
import React from 'react'
import { useItemCreator } from './hook'

const ItemCreator: React.FC = () => {
  const {
    open,
    loading,
    form,
    handleCancel,
    handleCreate,
  } = useItemCreator()

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      onOk={handleCreate}
      confirmLoading={loading}
      destroyOnClose
      title='创建凭证'
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='凭证名称'
          name='name'
          rules={[{ required: true, message: '请输入凭证名称' }]}
        >
          <Input autoFocus placeholder='凭证名称' autoComplete='off' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ItemCreator

