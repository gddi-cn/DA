
import './TaskStep.module.less'

const TaskStep = (): JSX.Element => {
  return (
    <div styleName='TaskStep'>
      <div className='step_wrap '>
        <div className='step_item'>
          数据
        </div>
        <div className='step_item'>
          训练
        </div>
        <div className='step_item'>
          部署
        </div>
      </div>
    </div>
  )
}

export default TaskStep
