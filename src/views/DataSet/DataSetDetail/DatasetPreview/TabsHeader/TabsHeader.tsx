import { TabsHeader } from '@src/UIComponents'
import { ReactComponent as Train } from './icon/train.svg'
import { ReactComponent as Test } from './icon/test.svg'
import './TabsHeader.module.less'
import { useAtom } from 'jotai'
import { datasetTypeAtom } from '../../store'

const dataList = [
  {
    label: '训练数据',
    primaryKey: 'train_set',
    icon: <Train />
  },
  {
    label: '测试数据',
    primaryKey: 'val_set',
    icon: <Test />
  }
]

const CTabsHeader = (): JSX.Element => {
  const [, setDatasetType] = useAtom(datasetTypeAtom)

  const handleChangeTab = (key: string) => {
    setDatasetType(key as 'train_set' | 'val_set')
  }

  return (
    <div styleName='TabsHeader'>
      <TabsHeader
        dataList={dataList}
        handleChangeTab={handleChangeTab}
        defualtActiveKey="train_set"
      />
    </div>
  )
}

export default CTabsHeader
