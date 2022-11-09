import './FooterBar.module.less'

type Props = {
    rightContent:React.ReactNode
}

const FooterBar = (props: Props): JSX.Element => {
  const { rightContent } = props
  return (
    <div styleName='FooterBar'>
      <div className="g_footer_padding" />
      <div className="g_footer_container">
        <div />
        <div className='g_footer_right_wrap'>
          {rightContent}
        </div>
      </div>
    </div>
  )
}

export default FooterBar
