
import { isEmpty } from 'lodash'
import { Progress } from 'antd';
import './details.module.less'

const Details = (props:any) => {
  const { disPlayData } = props

  const contrast = () => {
    return isEmpty(disPlayData) ? null : (
      <>
        <img alt='laoding' src={disPlayData.img.input} className='contrast-img' />
        <img alt='laoding' src={disPlayData.img.out} className='contrast-img' />
      </>
    )
  }
  return (
    <div className='ana-details' styleName='ana-details'>
      <div className='progress'>

        <div className='progress-info'>

          {
            isEmpty(disPlayData) ? (
              <div className='loading-tips'>
                数据分析中
              </div>) : (
              <div className='value'>
                {
                  contrast()
                }
                {/* {disPlayData?.value}% */}
                <Progress
                  strokeLinecap="butt"
                  type="circle"
                  percent={disPlayData?.value}
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
          {
            ({
              图片数据量: '数据集各分类的数据量是否充分',
              目标尺寸: '图片中检测的目标尺寸大小',
              拍摄光照质量: '图片曝光的明暗程度',
              目标完整性: '图片中检测的目标完整性比例',
              数据均衡度: '数据集各分类的数据量均衡度',
              类别可区分性: '数据集各类别间的可区分性',
              场景丰富度: '图片中的目标包含的背景丰富程度',
              目标密集度: '图片检测的目标在同张图中的密集程度',
            } as any)[disPlayData?.name] || ''
          }
        </div>
      </div>

    </div>
  )
}

export default Details
