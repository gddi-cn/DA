import React from 'react'
import './radar.module.less'

import { useRadar } from './hook'
import { RadarProps } from '@views/DataSet/DatasetAnalysis/type'

const Radar: React.FC<RadarProps> = (props) => {
  const { containerRef } = useRadar(props)

  return (
    <div styleName='dataAnalysisRadar'>
      <div ref={containerRef} className='chartContainer' />
    </div>
  )
}

export default Radar
