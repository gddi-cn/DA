import { Progress } from 'antd';
import './details.module.bak.less'
import { DetailProps } from '@views/DataSet/DatasetAnalysis/type'
import React from 'react'

const Details: React.FC<DetailProps> = (
  {
    detail: {
      score,
      tip,
      img
    }
  }
) => {
  const contrast = () => {
    return img ? (
      <>
        <img alt='loading' src={img.input} className='contrast-img' />
        <img alt='loading' src={img.output} className='contrast-img' />
      </>
    ) : null
  }
  return (
    <div className='ana-details' styleName='ana-details'>
      <div className='progress'>

        <div className='progress-info'>

          {
            !score ? (
              <div className='loading-tips'>
                数据分析中
              </div>) : (
              <div className='value'>
                {
                  contrast()
                }
                <Progress
                  strokeLinecap="butt"
                  type="circle"
                  percent={score}
                  strokeColor='#48A2DF'
                  trailColor='#97CAEC'
                  strokeWidth={10}
                  format={percent => `${percent} %`}
                />
              </div>
            )

          }

        </div>

      </div>

      <div className='laoding-bg'>

        <div className='tips'>
          123
        </div>
      </div>

    </div>
  )
}

export default Details
