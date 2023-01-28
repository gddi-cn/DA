import React from 'react'
import { Table as AntTable } from 'antd'
import styled from 'styled-components'

import { useTerminalList } from './hook'
import NoData from '../NoData'

import columns from '../columns'

const Table = styled(AntTable)`
  .ant-table-cell {
    background: #fff;
  }
  .ant-table-thead>tr>th {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
  .ant-table-tbody>tr>td {
    border-bottom: 1px solid rgba(98, 176, 229, 0.5);
  }
  .ant-table-tbody>tr {
    &:last-of-type {
      > td {
        border-bottom: none;
      }
    }
  }
`

const List: React.FC = () => {
  const { loading, showNoData, dataSource, handleSelectedChange } = useTerminalList()

  return showNoData ? <NoData /> : (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={columns as any}
      rowKey={'id'}
      pagination={false}
      rowSelection={{
        columnWidth: 0.5,
        onChange: handleSelectedChange as any,
      }}
    />
  )
}

export default List
