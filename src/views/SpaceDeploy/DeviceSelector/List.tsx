import { Box, CircularProgress } from '@mui/material'
import { Table as AntTable } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { deviceListAtom } from './store'
import { selectedDeviceListAtom } from '../store'
import DeviceList from '@src/components/DeviceList/DeviceList'

const Table = styled(AntTable)`
  .ant-table-cell {
    background: #fff;
  }
  .ant-table-thead>tr>th {
    border-bottom: 1px solid rgba(98, 176, 229, .5);
  }
  .ant-table-tbody>tr>td {
    border-bottom: 1px solid rgba(98, 176, 229, .5);
  }
  .ant-table-tbody>tr {
    &:last-of-type {
      > td {
        border-bottom: none;
      }
    }
  }
`

const useList = () => {
  const deviceList = useAtomValue(deviceListAtom)
  const [selectedDeviceList, setSelectedDeviceList] = useAtom(selectedDeviceListAtom)

  const handleSelectedChange = (_: any, deviceList: Array<GroupDevice.Instance>) => {
    setSelectedDeviceList(deviceList)
  }

  return {
    deviceList,
    selectedDeviceList,
    handleSelectedChange,
  }
}


const Inner: React.FC = () => {
  const {
    deviceList,
    selectedDeviceList,
    handleSelectedChange,
  } = useList()

  return (
    <DeviceList
      deviceList={deviceList}
      selectedRowKeys={selectedDeviceList.map(x => x.id)}
      onSelectChange={handleSelectedChange}
    />
  )
}

const Fallback: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
      <CircularProgress size={50} />
    </Box>
  )
}

const List: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Inner />
    </React.Suspense>
  )
}

export default List

