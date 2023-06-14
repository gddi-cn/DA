import React from 'react'
import { Box, Typography } from '@mui/material'
import { Table as AntTable } from 'antd'
import styled from 'styled-components'

import noDevice from './no_device.png'
import columns from './columns'

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

const NoDevice = styled.img`
  width: 332px;
  height: 200;
  object-fit: cover;
`

export interface DeviceListProps {
  deviceList: Array<GroupDevice.Instance>
  selectedRowKeys: Array<GroupDevice.Instance['id']>
  onSelectChange?: (selectedIds: Array<GroupDevice.Instance['id']>, selectedDeviced: Array<GroupDevice.Instance>) => void
  emptyTip?: string
}

const Empty: React.FC<{ tip?: string }> = (
  {
    tip = '暂无已注册设备，请先点击右上方按钮进行注册'
  }
) => {
  return (
    <Box
      sx={{
        mt: '79px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <NoDevice src={noDevice} alt='No Device' />
      <Typography
        sx={{
          mt: '40px',
          fontSize: 18,
          fontWeight: 600,
          color: '#061926',
        }}
      >
        暂无设备
      </Typography>
      <Typography
        sx={{
          mt: '10px',
          fontSize: 14,
          fontWeight: 400,
          color: '#061926',
        }}
      >
        {tip}
      </Typography>
    </Box>
  )
}

const DeviceList: React.FC<DeviceListProps> = (
  {
    deviceList,
    selectedRowKeys,
    onSelectChange,
    emptyTip
  }
) => {
  if (!deviceList.length) return (
    <Box sx={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
      <Empty tip={emptyTip} />
    </Box>
  )

  return (
    <Table
      dataSource={deviceList}
      columns={columns as any}
      rowKey='id'
      pagination={false}
      rowSelection={{
        selectedRowKeys,
        columnWidth: .5,
        onChange: onSelectChange as any,
      }}
    />
  )
}

export default DeviceList
