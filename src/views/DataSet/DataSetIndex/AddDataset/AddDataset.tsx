import { ReactComponent as ADDSVG } from './icon/add.svg'
import './AddDataset.module.less'

const AddDataset = (): JSX.Element => {
  return (
    <div styleName='AddDataset'>
      <div className='add_btn_wrap'>
        <ADDSVG></ADDSVG>
        <span className='add_btn_wrap_text'>
          创建数据集
        </span>
      </div>
    </div>
  )
}

export default AddDataset
