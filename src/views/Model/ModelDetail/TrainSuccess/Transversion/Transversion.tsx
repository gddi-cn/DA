import { TabsHeader } from '@src/UIComponents'
import { ReactComponent as Xunliancanshu } from './icon/训练参数.svg'
import { ReactComponent as Xunlianjingdu } from './icon/训练精度.svg'
import { ReactComponent as Yuceshili } from './icon/预测示例.svg'
import './Transversion.module.less'

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
const Transversion = (props: any): JSX.Element => {
  console.log(props)
  const handleChangeTab = (key: string) => {
    console.log(key)
  }

  return (
    <div styleName='Transversion'>
      <div className='Transversion_header'>
        <TabsHeader dataList={dataList} handleChangeTab={handleChangeTab} defualtActiveKey="ForecastExample" />
      </div>
      <div className='Transversion_content'>
        123
      </div>
    </div>
  )
}

export default Transversion
