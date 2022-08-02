
import { SearchOutlined } from '@ant-design/icons'
import type { InputProps } from 'antd'
import { Input } from 'antd'
import './GIconInput.module.less'

const GIconInput = (props: InputProps): JSX.Element => {
  const { className, ...rest } = props
  return (
    <div styleName='GIconInput' className={className}>
      <div className='input_wrap'>
        <div className='icon_wrap'>
          <SearchOutlined />
        </div>
        <Input {...rest} />
      </div>
    </div>
  )
}

export default GIconInput
