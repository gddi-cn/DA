import React from 'react'
import './radar.module.less'

import { useRadar } from './hook'
import { AnalyzeData } from '@src/shared/types/dataset'
import { AnalyzeItem } from '@src/shared/enum/dataset'

export interface RadarProps {
  dataList: Array<AnalyzeData>,
  onItemChange?(item?: AnalyzeItem): void
}


const Radar: React.FC<RadarProps> = (props) => {
  const { containerRef } = useRadar(props)

  return (
    <div styleName='dataAnalysisRadar'>
      <div ref={containerRef} className='chartContainer' />
    </div>
  )
}

export default Radar
