
import { ReactComponent as WTF } from './icon/wtf.svg'
import { GButton } from '@src/UIComponents'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX, APP_LOCAL_FILE_STEP_1 } from '@router'
import './AfterUploaded.module.less'

// type Props={
//     setCurrentStep:any
// }
const AfterUploaded = (): JSX.Element => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate({ pathname: APP_DATA_SET_INDEX })
  }
  const handleGotoCreate = () => {
    // todo:清理所有之前的流程信息
    navigate({ pathname: APP_LOCAL_FILE_STEP_1 })
  }
  return (
    <div styleName='AfterUploaded'>
      <div className='AfterUploaded_wrap'>
        <WTF />
        <div className='title'>
                  数据校验中...
        </div>

        <div className='sub_title'>
          <p>
                      数据校验过程可能等待时间较长
          </p>
          <p>
                      校验成功将自动生成新数据集，校验失败请参考失败原因重新上传数据
          </p>
        </div>

        <div className='btn_wrap'>
          <GButton className='close_btn' onClick={handleClose}>关闭</GButton>
          <GButton className='new_btn' onClick={handleGotoCreate}>创建新数据集</GButton>
        </div>
      </div>

    </div>
  )
}

export default AfterUploaded
