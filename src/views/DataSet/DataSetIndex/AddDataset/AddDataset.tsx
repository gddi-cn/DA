import { ReactComponent as ADDSVG } from './icon/add.svg'
import { APP_DATASET_CREATE_TYPE } from '@router'
import { useNavigate } from 'react-router-dom'
import './AddDataset.module.less'

const AddDataset = (): JSX.Element => {
  const navigate = useNavigate()

  const handleGotoCreate = () => {
    navigate({
      pathname: APP_DATASET_CREATE_TYPE
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
