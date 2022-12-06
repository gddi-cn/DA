import './details.module.less'
import React from 'react'
import { Typography } from 'antd'
import Score, { getProgressClassName } from '@views/DataSet/DatasetAnalysis/Details/Score'
import { getScoreClass } from '@views/DataSet/DatasetAnalysis/utils'
import { AnalyzeData } from '@src/shared/types/dataset'


type DetailProps = {
  detail: {
    [p in keyof AnalyzeData]?: AnalyzeData[p]
  }
}

const Details: React.FC<DetailProps> = (
  {
    detail: {
      score,
      tip,
      img
    }
  }
) => {
  const [command, suggestion, className] = React.useMemo(
    () => {
      if (!tip) return []

      const sc = getScoreClass(score || 0)
      const className = getProgressClassName(score || 0)

      return [...tip.suggestion[sc], className]
    },
    [score, tip]
  )

  return (
    <div styleName='ana-details'>
      <div className="ana-details-title">
        <Typography.Title level={3} className='content'>
          { tip?.name || '--' }
        </Typography.Title>
      </div>
      <div className='ana-details-description'>
        <Typography.Title level={5} className='content'>
          { tip?.description || '--' }
        </Typography.Title>
      </div>
      <div className='ana-details-progress'>
        <Score score={score} explain={tip?.explain} />
      </div>
      <div className="ana-details-command">
        <Typography.Title level={4} className={`content-${className}`}>
          { command || '' }
        </Typography.Title>
      </div>
      <div className='ana-details-suggestion'>
        <Typography.Title level={4} className={`content-${className}`}>
          { suggestion || '' }
        </Typography.Title>
      </div>
      <div className="ana-details-img">
        <div className="input" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={img?.input} alt="good-example"/>
          <Typography.Paragraph className='tip-great'>
            {img?.inputTip ? '示例：' + img.inputTip : ''}
          </Typography.Paragraph>
        </div>
        <div className="padding" />
        <div className="output" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={img?.output} alt="bad-example"/>
          <Typography.Paragraph className='tip-bad'>
            {img?.outputTip ? '示例：' + img.outputTip : ''}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Details
