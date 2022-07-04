import TabsHeader from './TabsHeader'
import { useState } from 'react'
import TabContent from './TabContent'

import './DatasetPreview.module.less'

const DatasetPreview = (): JSX.Element => {
  const [activeKey, setActiveKey] = useState(0)

  return (
    <div styleName='DatasetPreview'>
      <TabsHeader activeKey={activeKey} setActiveKey={setActiveKey}/>
      <TabContent>
              123
      </TabContent>
    </div>
  )
}

export default DatasetPreview
