import { Box, CircularProgress } from '@mui/material'
import { Table as AntTable } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { deviceListAtom, selectedDeviceIdListAtom } from './store'
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
  const [selectedDeviceIdList, setSelectedDeviceIdList] = useAtom(selectedDeviceIdListAtom)

  const handleSelectedChange = (idList: Array<GroupDevice.Instance['id']>) => {
    setSelectedDeviceIdList(idList)
  }

  return {
    deviceList,
    selectedDeviceIdList,
    handleSelectedChange,
  }
}


const Inner: React.FC = () => {
  const {
    deviceList,
    selectedDeviceIdList,
    handleSelectedChange,
  } = useList()

  return (
    <DeviceList
      deviceList={deviceList}
      selectedRowKeys={selectedDeviceIdList}
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

