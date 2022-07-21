import { ReactComponent as ADDSVG } from './icon/add.svg'
import { APP_DATASET_CREATE_TYPE } from '@router'
import { useNavigate } from 'react-router-dom'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './AddDataset.module.less'

const AddDataset = (): JSX.Element => {
  const navigate = useNavigate()
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const handleGotoCreate = () => {
    navigate({
      pathname: APP_DATASET_CREATE_TYPE
    })

    socketPushMsgForProject(activePipeLine, {
      active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_CREATE_TYPE
    })
  }
  return (
    <div styleName='AddDataset'>
      <div className='add_btn_wrap' onClick={handleGotoCreate}>
        <ADDSVG></ADDSVG>
        <span className='add_btn_wrap_text'>
          创建数据集
        </span>
      </div>
    </div>
  )
}

export default AddDataset
