
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { ReactComponent as Bushu } from './icon/bushu.svg'
import { ReactComponent as Moxing } from './icon/moxing.svg'
import { ReactComponent as Shuju } from './icon/shuju.svg'
import { ReactComponent as Arrow } from './icon/arrow.svg'

import { useLocation } from 'react-router-dom'
import {
  APP_DATA_SET_INDEX,
  APP_DATASET_DETAIL,
  APP_MODEL_INDEX,
  APP_GUIDE_PAGE
} from '@router'
import './TaskStep.module.less'

const DATASET_ACTIVE = [
  APP_DATA_SET_INDEX,
  APP_DATASET_DETAIL
]

const MODEL_ACTIVE = [
  APP_MODEL_INDEX
]

const PUBLISH_ACTIVE = [
  APP_GUIDE_PAGE
]

const TaskStep = (): JSX.Element => {
  const { pathname } = useLocation()
  const model = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.model
  })

  const dataset = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.dataset
  })

  const deploy = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo.deploy
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

  const getCls = (activeArr:Array<string>) => {
    if (activeArr.includes(pathname)) {
      return 'step_item active_step_item'
    }

    return 'step_item'
  }
  return (
    <div styleName='TaskStep'>
      <div className='step_wrap '>
        <div className={getCls(DATASET_ACTIVE)} onClick={handleDatasetClick}>
          <Shuju className='step_svg' />  数据
        </div>
        <span className='arrow_wrap'><Arrow /></span>
        <div className={getCls(MODEL_ACTIVE)} onClick={handleModelClick}>
          <Moxing className='step_svg'/> 模型
        </div>
        <span className='arrow_wrap'><Arrow /></span>
        <div className={getCls(PUBLISH_ACTIVE)} onClick={handleDeployClick}>
          <Bushu className='step_svg'/> 部署
        </div>
      </div>
    </div>
  )
}

export default TaskStep
