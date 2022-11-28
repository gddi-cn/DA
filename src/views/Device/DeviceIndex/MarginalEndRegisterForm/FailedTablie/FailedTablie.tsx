import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Table } from 'antd'
import { useGetTableParams } from './hooks'
// import api from '@api'
import './FailedTablie.module.less'

const FailedTablie = (props: any, ref:any): JSX.Element => {
  const { data } = props
  const [isModalVisible, setIsModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({ setIsModalVisible }))
  const { columns, dataSource }: any = useGetTableParams({ data })

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div styleName='FailedTablie'>

      <Modal title="注册失败设备" open={isModalVisible} onCancel={handleCancel} getContainer={false} footer={null}>
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 8, hideOnSinglePage: true }} />
      </Modal>
    </div>
  )
}
export default forwardRef(FailedTablie)
