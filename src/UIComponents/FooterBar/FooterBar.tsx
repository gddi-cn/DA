
import './FooterBar.module.less'

type Props = {
    rightContent:React.ReactNode
}

const FooterBar = (props: Props): JSX.Element => {
  const { rightContent } = props
  return (
    <div styleName='FooterBar'>
      <div></div>
      <div className='right_wrap'>
        {rightContent}
      </div>
    </div>
  )
}

export default FooterBar
