
import { ReactComponent as WTF } from './icon/wtf.svg'
import { GButton } from '@src/UIComponents'
import { useNavigate } from 'react-router-dom'
import { APP_DATA_SET_INDEX, APP_DATASET_CREATE_TYPE } from '@router'
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
    navigate({ pathname: APP_DATASET_CREATE_TYPE })
  }
  return (
    <div styleName='AfterUploaded'>
      <div className='AfterUploaded_wrap'>
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

export default AfterUploaded
