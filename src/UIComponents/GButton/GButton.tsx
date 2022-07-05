import { Button } from 'antd'
import type { ButtonProps } from 'antd'
import './GButton.module.less'

interface Props extends ButtonProps {
    children:React.ReactNode
}
const GButton = (props: Props): JSX.Element => {
  const { children, ...rest } = props
  return (
    <div styleName='GButton'>
      <Button {...rest}>
        {
          children
        }
      </Button>
    </div>
  )
}

export default GButton
