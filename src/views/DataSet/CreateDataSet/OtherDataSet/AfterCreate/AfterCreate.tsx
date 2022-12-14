
import { ReactComponent as WTF } from './icon/wtf.svg'
import { GButton } from '@src/UIComponents'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX, APP_DATASET_CREATE_TYPE } from '@router'

import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { socketPushMsgForProject } from '@ghooks'
import './AfterCreate.module.less'

// type Props={
//     setCurrentStep:any
// }
const AfterCreate = (): JSX.Element => {
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const navigate = useNavigate()
  const handleClose = () => {
    navigate({ pathname: APP_DATA_SET_INDEX })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
      APP_THIRDPARTY_STEP_1: {},
      APP_THIRDPARTY_STEP_2: {},
      APP_THIRDPARTY_STEP_3: {},
      APP_THIRDPARTY_SelectTrainType: {}
    })
  }
  const handleGotoCreate = () => {
    // todo:清理所有之前的流程信息
    navigate({ pathname: APP_DATASET_CREATE_TYPE })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_CREATE_TYPE,
      APP_THIRDPARTY_STEP_1: {},
      APP_THIRDPARTY_STEP_2: {},
      APP_THIRDPARTY_STEP_3: {},
      APP_THIRDPARTY_SelectTrainType: {}
    })
  }
  return (
    <div styleName='AfterCreate'>
      <div className='AfterCreate_wrap'>
        <WTF />
        <div className='title'>
          数据导入成功
        </div>

        <div className='btn_wrap'>
          <GButton className='close_btn' onClick={handleClose}>返回数据列表</GButton>
          <GButton className='new_btn' onClick={handleGotoCreate}>创建新数据集</GButton>
        </div>
      </div>

    </div>
  )
}

export default AfterCreate
