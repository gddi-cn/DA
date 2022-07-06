
import { GEcharts } from '@src/UIComponents'
import { getOptions } from './options'
import './EchartBar.module.less'

const EchartBar = (props: any) => {
  const { items } = props
  return (
    <div className='EchartBar' styleName='EchartBar'>
      <GEcharts options={getOptions(items)} />
    </div>
  )
}

export default EchartBar
