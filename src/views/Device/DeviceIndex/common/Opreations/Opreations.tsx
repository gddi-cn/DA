import { useState } from 'react'
import { Drawer, message, Modal } from 'antd'
import ModelDrawer from '../ModelDrawer'

import api from '@api'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons'
import MoveOrAddTo from '../../common/MoveOrAddTo'
import './Opreations.module.less'

const { confirm } = Modal;

const Opreations = (props: any): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const { data: { id }, selected, fetchDeviceList, deviceType } = props

  const handleDelete = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否注销该设备?',
      onOk () {
        return new Promise((resolve, reject) => {
          const fn = async () => {
            const res = await api.delete(`/v3/devicegroups/${selected?.id}/devices/${id}`)
            if (res.code === 0) {
              resolve(true)
              message.success(res?.message)

              fetchDeviceList()
            } else {
              reject(new Error(res?.message))
            }
          }
          fn()
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel () {
        console.log('cansel')
      },
    });
  }
  return (

    <div styleName='Opreations'>
      <div className='op_item' onClick={() => setVisible(true)}>
        查看应用列表
      </div>
      <MoveOrAddTo type={deviceType} groupId={selected?.id} deviceId={id} doMethod='move' fetchDeviceList={fetchDeviceList}>
        移动到组<DownOutlined className='DownOutlined' />

      </MoveOrAddTo>
      <MoveOrAddTo type={deviceType} groupId={selected?.id} deviceId={id} doMethod='add' fetchDeviceList={fetchDeviceList} >

        添加到组<DownOutlined className='DownOutlined' />
      </MoveOrAddTo>

      <div className='op_item delete_btn' onClick={handleDelete}>
        注销
      </div>
      <Drawer
        title='应用列表'
        visible={visible}
        destroyOnClose
        placement='bottom'
        maskClosable
        onClose={() => setVisible(false)}
        getContainer={false}
        footer={null}
        className='modal-drawer'
      >
        {visible && <ModelDrawer id={id} />}
      </Drawer>
    </div>
  )
}

export default Opreations
