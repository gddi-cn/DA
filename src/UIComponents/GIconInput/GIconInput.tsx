
import { SearchOutlined } from '@ant-design/icons'
import type { InputProps } from 'antd'
import { Input } from 'antd'
import './GIconInput.module.less'

const GIconInput = (props: InputProps): JSX.Element => {
  return (
    <div styleName='GIconInput'>
      <div className='input_wrap'>
        <div className='icon_wrap'>
          <SearchOutlined />
        </div>
        <Input {...props} />
      </div>
    </div>
  )
}

export default GIconInput
