import { TabsNav } from '@src/UIComponents'
import type { Dispatch, SetStateAction } from 'react'
import './TabsHeader.module.less'

type TabHeaderDataItem = {
    label: string,
    icon?: React.ReactNode,
    primaryKey: number
}
type TabItemProps<T> = {
    data: T,
    activeKey: number,
    handleClick: (data: TabHeaderDataItem) => void
}

type TabData = Array<TabHeaderDataItem>

function TabItem<T extends TabHeaderDataItem> (props: TabItemProps<T>) {
  const { data, activeKey } = props
  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)
    if (data?.primaryKey === activeKey) {
      return 'tab_item_header tab_item_header_active'
    }

    return 'tab_item_header'
  }
  return (
    <div className={getCls()}>
      <span style={{ zIndex: 1 }}>
        {data?.label}
      </span>
    </div>
  )
}

type TabsHeaderProps={
    setActiveKey: Dispatch<SetStateAction<number>>,
    activeKey:number
}

const TabsHeader = (props: TabsHeaderProps): JSX.Element => {
  const { setActiveKey, activeKey } = props
  const dataList: TabData = [
    {
      label: '训练数据',
      primaryKey: 0,
    },
    {
      label: '验证数据',
      primaryKey: 1
    }
  ]
  const handleClick = (data: TabHeaderDataItem) => {
    setActiveKey(data?.primaryKey)
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
