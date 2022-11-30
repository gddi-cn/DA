import { TabsNav } from '@src/UIComponents'
import { useState } from 'react'
import './TabsHeader.module.less'

type TabHeaderDataItem = {
    label: string,
    icon?: React.ReactNode,
    primaryKey: string
}
type TabItemProps<T> = {
    data: T,
    activeKey: string,
    handleClick: (key: string) => void
}

// type TabData = Array<TabHeaderDataItem>

function TabItem<T extends TabHeaderDataItem> (props: TabItemProps<T>) {
  const { data, activeKey, handleClick } = props
  const getCls = () => {
    if (data?.primaryKey === activeKey) {
      return 'tab_item_header tab_item_header_active'
    }

    return 'tab_item_header'
  }
  return (
    <div className={getCls()} onClick={() => handleClick(data.primaryKey)}>
      {
        data.icon
      }
      <span style={{ zIndex: 1 }}>
        {data?.label}
      </span>
    </div>
  )
}

type DataListItem = {
    label: string,
    primaryKey: string,
    icon: React.ReactNode
}

type TabsHeaderProps = {
    handleChangeTab: (key: string) => void,
    defualtActiveKey: string,
    dataList: DataListItem[]
}

const TabsHeader = (props: TabsHeaderProps): JSX.Element => {
  const { handleChangeTab, defualtActiveKey, dataList } = props
  const [activeKey, setActiveKey] = useState<string>(defualtActiveKey)

  const handleClick = (primaryKey: string) => {
    handleChangeTab(primaryKey)
    setActiveKey(primaryKey)
  }

  const getActiveNode = (data: TabHeaderDataItem) => {
    return activeKey === data.primaryKey
  }

  const renderItem = (data: TabHeaderDataItem) => {
    return (
      <TabItem data={data} activeKey={activeKey} handleClick={handleClick} />
    )
  }

  return (
    <div styleName='TabsHeader'>
      <TabsNav dataList={dataList} renderItem={renderItem} getActiveNode={getActiveNode} />
    </div>
  )
}

export default TabsHeader
