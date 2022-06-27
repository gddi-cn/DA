import { PlusOutlined } from '@ant-design/icons'
import './AddButton.module.less'

const AddButton = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='AddButton'>
      <div className='plus_icon_wrap'>
        <PlusOutlined />
      </div>
    </div>
  )
}

export default AddButton
