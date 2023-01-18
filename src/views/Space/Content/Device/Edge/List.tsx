import React from 'react'
import { Table } from 'antd'

import { useEdgeList } from './hook'
import NoData from '../NoData'

import columns from '../columns'

const List: React.FC = () => {
  const { loading, showNoData, dataSource, handleSelectedChange } = useEdgeList()

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
