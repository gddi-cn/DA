// import { Button } from 'antd'
// import type { ButtonProps } from 'antd'
import './Glegend.module.less'

interface Props {
    label:React.ReactNode,
    color:string
}
const Glegend = (props: Props): JSX.Element => {
  const { label, color } = props
  return (
    <div styleName='Glegend'>
      <span className='Glegend_label'>{label}</span>
      <span className='Glegend_color_bar' style={{ backgroundColor: color }}></span>
    </div>
  )
}

export default Glegend
