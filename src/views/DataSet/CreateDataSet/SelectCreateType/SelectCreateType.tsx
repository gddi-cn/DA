
import { ReactComponent as GDDI } from './icon/共达地.svg'
import { ReactComponent as MANFU } from './icon/曼孚科技.svg'
import { APP_DATASET_LOCALDATA, APP_DATASET_IMPORT } from '@router'
import { useNavigate } from 'react-router-dom'
import './SelectCreateType.module.less'

const SelectCreateType = (props: any): JSX.Element => {
  console.log(props)
  const navigate = useNavigate()
  const handleGotoLocal = () => {
    navigate({ pathname: APP_DATASET_LOCALDATA })
  }

  const handleGotoImprot = () => {
    navigate({ pathname: APP_DATASET_IMPORT })
  }
  return (
    <div styleName='SelectCreateType'>
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
  )
}

export default SelectCreateType
