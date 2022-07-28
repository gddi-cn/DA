import { TabsHeader } from '@src/UIComponents'
import { ReactComponent as Train } from './icon/train.svg'
import { ReactComponent as Test } from './icon/test.svg'
import './TabsHeader.module.less'

type TabsHeaderProps = {
  handleChangeTab: (key:string)=>void,
}

const CTabsHeader = (props: TabsHeaderProps): JSX.Element => {
  const { handleChangeTab } = props
  const dataList = [
    {
      label: '训练数据',
      primaryKey: 'train_set',
      icon: <Train />
    },
    {
      label: '验证数据',
      primaryKey: 'val_set',
      icon: <Test />
    }
  ]

  return (
    <div styleName='TabsHeader'>
      <TabsHeader dataList={dataList} handleChangeTab={handleChangeTab} defualtActiveKey="train_set" />
    </div>
  )
}

export default CTabsHeader
