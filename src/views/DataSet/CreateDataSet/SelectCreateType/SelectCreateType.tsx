
import { ReactComponent as GDDI } from './icon/共达地.svg'
import { ReactComponent as MANFU } from './icon/曼孚科技.svg'
import { CREATE_DATASET_WITH_MARKED, APP_THIRDPARTY_SelectTrainType, APP_DATA_SET_INDEX } from '@router'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { useNavigate } from 'react-router-dom'
import { FooterBar, GButton } from '@src/UIComponents'
import { useMemo } from 'react'
import TaskStep from '@src/views/container/TaskStepLayout/TaskStep'
import './SelectCreateType.module.less'

const SelectCreateType = (props: any): JSX.Element => {
  const navigate = useNavigate()
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const handleGotoLocal = () => {
    navigate({ pathname: CREATE_DATASET_WITH_MARKED })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.CREATE_DATASET_WITH_MARKED
    })
  }

  const handleGotoImprot = () => {
    navigate({ pathname: APP_THIRDPARTY_SelectTrainType })
    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_THIRDPARTY_SelectTrainType
    })
  }

  const rightContent = useMemo(() => {
    const handleGoback = () => {
      //
      // setCurrentStep(1)
      navigate({
        pathname: APP_DATA_SET_INDEX
      })

      socketPushMsgForProject(activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX
      })
    }

    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' type='primary' onClick={handleGoback}>取消</GButton>

      </div>
    )
  }, [navigate, activePipeLine])
  return (
    <div styleName='SelectCreateType'>
      <div className='SelectCreateType_wrap'>
        <TaskStep />
        <div className='title'>
          您想如何创建数据集？
        </div>
        <div className='sub_title'>
          数据是模型训练的第一步。创建数据集后，您可以使用该数据进行模型训练。
        </div>
        <div className='type_wrap'>
          <div className='type_item_wrap' onClick={handleGotoLocal}>
            <GDDI />
            <div className='type_title'>本地上传</div>
          </div>
          <div className='type_item_wrap' onClick={handleGotoImprot}>
            <MANFU />
            <div className='type_title'>第三方导入</div>
          </div>

        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default SelectCreateType
