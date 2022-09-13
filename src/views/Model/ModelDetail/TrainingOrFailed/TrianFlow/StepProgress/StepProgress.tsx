
import './StepProgress.module.less'

type Props = {
  current: number,
  flows?: any[],
  progress:number
}

const StepProgress = (props: Props) => {
  const { flows = [], current, progress } = props

  const getCls = (index: number) => {
    if (index <= current) {
      return 'StepProgress_item StepProgress_item_done'
    }

    return 'StepProgress_item'
  }
  return (
    <div styleName='StepProgress' >
      {
        flows.map((o, i) => {
          return (
            <div key={i} className={getCls(i)}>
              <div className='bar'></div>
              <p className='flow_text'>{o}</p>
            </div>
          )
        })
      }

      <div className='percent_wrap'>
        {+(progress * 100).toFixed(0)}%
      </div>
    </div>
  )
}

export default StepProgress
