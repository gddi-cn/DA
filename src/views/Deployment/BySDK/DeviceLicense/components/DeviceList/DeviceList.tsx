import React from 'react'
import { Button as AntButton } from 'antd'
import { License } from '@src/shared/types/license'
import styled from 'styled-components'

import Dialog from '../../../components/Dialog'
import DeviceTable from './DeviceTable'
import Footer from './Footer'
import { useDeviceList } from './hook'

const Button = styled(AntButton)`
  padding: 0;
`

const DeviceList: React.FC<Pick<License, 'devices'>> = (
  {
    devices
  }
) => {
  const { open, openDialog, closeDialog } = useDeviceList(devices || [])

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DeviceTable />
        <Footer />
      </Dialog>
      <Button type={'link'} color={'#62B0E5'} onClick={openDialog}>查看设备列表</Button>
    </>
  )
}

export default DeviceList
