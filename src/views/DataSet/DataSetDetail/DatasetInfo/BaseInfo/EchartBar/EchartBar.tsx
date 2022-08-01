
import { GEcharts } from '@src/UIComponents'
import { getOptions } from './options'
import './EchartBar.module.less'

const EchartBar = (props: any) => {
  const { dataList } = props
  return (
    <div className='EchartBar' styleName='EchartBar'>
      <GEcharts options={getOptions(dataList)} />
    </div>
  )
}

export default EchartBar
