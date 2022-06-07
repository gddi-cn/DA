
import './Header.module.less'
import { ReactComponent as Logo } from '@src/asset/images/logo.svg'

const Header = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='Header'>
      <Logo />
    </div>
  )
}

export default Header
