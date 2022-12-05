import './FooterBar.module.less'

type Props = {
  leftContent?: React.ReactNode
  rightContent: React.ReactNode
}

const FooterBar = (props: Props): JSX.Element => {
  const { rightContent, leftContent } = props
  return (
    <div styleName='FooterBar'>
      <div>{leftContent}</div>
      <div className='right_wrap'>
        {rightContent}
      </div>
    </div>
  )
}

export default FooterBar
