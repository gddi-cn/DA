import { Modal } from 'antd'
import React from 'react'
import { useItemDeleter } from './hook'

const ItemDeleter: React.FC = () => {
  const {
    open,
    loading,
    handleClose,
    handleDelete,
  } = useItemDeleter()

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={handleDelete}
      confirmLoading={loading}
      destroyOnClose
      title='删除凭证'
    >
      确定要删除该凭证吗？
    </Modal>
  )
}

export default ItemDeleter

