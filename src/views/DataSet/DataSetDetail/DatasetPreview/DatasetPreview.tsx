import TabsHeader from './TabsHeader'
import { useState } from 'react'
import TabContent from './TabContent'
import Preview from './Preview'
import type { SetStateAction, Dispatch } from 'react'
import './DatasetPreview.module.less'

type Props={
  setWhichSet: Dispatch<SetStateAction<string>>,
  classInfo:any
}
const DatasetPreview = (props: Props): JSX.Element => {
  const { setWhichSet, classInfo } = props
  const [activeKey, setActiveKey] = useState<string>('trainset_id')

  const handleChangeTab = (key:string) => {
    console.log(key)
    setWhichSet(key)
    setActiveKey(key)
  }

  return (
    <div styleName='DatasetPreview'>
      <TabsHeader activeKey={activeKey} handleChangeTab={handleChangeTab}/>
      <TabContent>
        <Preview classInfo={classInfo}/>
      </TabContent>
    </div>
  )
}

export default DatasetPreview
