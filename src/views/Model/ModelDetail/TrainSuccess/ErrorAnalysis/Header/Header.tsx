import React from 'react'

import { useHeader } from './hook'
import { TabsHeader } from '@src/UIComponents'

const Header: React.FC = () => {
  const { tabList, defaultTab, handleTabChange } = useHeader()
  return (
    <TabsHeader dataList={tabList} defualtActiveKey={defaultTab} handleChangeTab={handleTabChange} />
  )
}

export default Header
