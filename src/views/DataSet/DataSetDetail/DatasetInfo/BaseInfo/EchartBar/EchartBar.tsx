
import { GEcharts } from '@src/UIComponents'
import { getOptions } from './options'
import './EchartBar.module.less'
import { useAtom } from 'jotai'
import { classListAtom } from '../store'

const EchartBar = () => {
  const [classList] = useAtom(classListAtom)
  return (
    <div className='EchartBar' styleName='EchartBar'>
      <GEcharts options={getOptions(classList)} />
    </div>
  )
}

export default EchartBar
