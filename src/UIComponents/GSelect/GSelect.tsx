import { Select } from 'antd'
import type { SelectProps } from 'antd'
import './GSelect.module.less'

interface Props extends SelectProps {
    children: React.ReactNode
}
const GSelect = (props: Props): JSX.Element => {
  const { children, ...rest } = props
  return (
    <div styleName='GSelect' >
      <Select {...rest} getPopupContainer={triggerNode => triggerNode.parentNode}>
        {
          children
        }
      </Select>
    </div>
  )
}

export const Option = Select.Option

export default GSelect
