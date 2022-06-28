
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './TaskStep.module.less'

const TaskStep = (): JSX.Element => {
  const model = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.model
  })

  const dataset = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.dataset
  })

  const deploy = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.deploy
  })

  const activeStep = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.activeStep
  })

  // 点击逻辑、
  // 数据存在可以看详情、不存在就去数据集list选择

  const handleDatasetClick = () => {
    console.log(dataset)
  }

  // 存在可以去看model详情、不存在则判断是不是选了数据了，有数据的情况下可以
  const handleModelClick = () => {
    console.log(deploy)
  }

  // 存在可以去看model详情、不存在则不可点击
  // 要存在模型才可以点击这个、是模型必须训练完了才可以点击
  const handleDeployClick = () => {
    console.log(model)
  }

  const getCls = (currentKey:string) => {
    if (currentKey === activeStep) {
      return 'step_item active_step_item'
    }

    return 'step_item'
  }
  return (
    <div styleName='TaskStep'>
      <div className='step_wrap '>
        <div className={getCls('dataset')} onClick={handleDatasetClick}>
          数据
        </div>
        <div className={getCls('model')} onClick={handleModelClick}>
          训练
        </div>
        <div className={getCls('deploy')} onClick={handleDeployClick}>
          部署
        </div>
      </div>
    </div>
  )
}

export default TaskStep
