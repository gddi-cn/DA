import { TabsNav } from '@src/UIComponents'
import { ReactComponent as Train } from './icon/train.svg'
import { ReactComponent as Test } from './icon/test.svg'
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

type TabData = Array<TabHeaderDataItem>

function TabItem<T extends TabHeaderDataItem> (props: TabItemProps<T>) {
  const { data, activeKey, handleClick } = props
  const getCls = () => {
    // console.log(activeTaskInfo.id)
    // console.log(id)
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

type TabsHeaderProps = {
  handleChangeTab: (key:string)=>void,
  activeKey: string
}

const TabsHeader = (props: TabsHeaderProps): JSX.Element => {
  const { handleChangeTab, activeKey } = props
  const dataList: TabData = [
    {
      label: '训练数据',
      primaryKey: 'trainset_id',
      icon: <Train />
    },
    {
      label: '验证数据',
      primaryKey: 'validset_id',
      icon: <Test />
    }
  ]
  const handleClick = (primaryKey: string) => {
    handleChangeTab(primaryKey)
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
