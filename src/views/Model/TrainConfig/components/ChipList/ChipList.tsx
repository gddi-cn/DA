import React from 'react'
import { Spin } from 'antd'

import HotChip from './HotChip'
import AllChip from './AllChip'
import NoData from './NoData'

import { useChipList } from './hook'
import { ReactCusScrollBar } from '@src/UIComponents'

const ChipList: React.FC = () => {
  const { noData, loading } = useChipList()
  return noData ? (
      <NoData />
  ) : (
    <ReactCusScrollBar id={'chip-list-container'}>
      <Spin style={{ height: '100%', display: 'block' }} spinning={loading}>
        <div style={{ padding: '0 20px' }}>
          <HotChip />
          <AllChip />
        </div>
      </Spin>
    </ReactCusScrollBar>
  )
}

export default ChipList
