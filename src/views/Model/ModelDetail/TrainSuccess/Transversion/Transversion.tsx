import { TabsHeader } from '@src/UIComponents'
import { ReactComponent as Xunliancanshu } from './icon/训练参数.svg'
import { ReactComponent as Xunlianjingdu } from './icon/训练精度.svg'
import { ReactComponent as Yuceshili } from './icon/预测示例.svg'

import ForecastExample from './ForecastExample'
import TrainingAccuracy from './TrainingAccuracy'
import TrainingParameters from './TrainingParameters'
import './Transversion.module.less'
import { useMemo, useState } from 'react'
import ModelDetailType from '../../types'

const dataList = [
  {
    label: '预测示例',
    primaryKey: 'ForecastExample',
    icon: <Yuceshili />
  },
  {
    label: '训练精度',
    primaryKey: 'TrainingAccuracy',
    icon: <Xunlianjingdu />
  },
  {
    label: '训练参数',
    primaryKey: 'TrainingParameters',
    icon: <Xunliancanshu />
  }
]

type SubTabIndex = 'ForecastExample' | 'TrainingAccuracy' | 'TrainingParameters'
const Transversion = (props: ModelDetailType.TransversionProps): JSX.Element => {
  const { versionInfo } = props
  const [subTabIndex, setSubTabIndex] = useState<SubTabIndex>('ForecastExample')
  const handleChangeTab = (key: any) => {
    console.log(key)
    setSubTabIndex(key)
  }

  const View = useMemo(() => {
    const ReactComp: {
          [index: string]: React.ReactNode
      } = {

        ForecastExample: <ForecastExample versionInfo={versionInfo}/>,
        TrainingAccuracy: <TrainingAccuracy />,
        TrainingParameters: <TrainingParameters />,
      }

    return ReactComp[subTabIndex] || null
  }, [subTabIndex, versionInfo])

  return (
    <div styleName='Transversion'>
      <div className='Transversion_header'>
        <TabsHeader dataList={dataList} handleChangeTab={handleChangeTab} defualtActiveKey="ForecastExample" />
      </div>
      <div className='Transversion_content'>
        {View}
      </div>
    </div>
  )
}

export default Transversion
