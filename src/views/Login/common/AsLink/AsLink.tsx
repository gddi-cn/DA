
import './AsLink.module.less'

type Props = {
    text?: React.ReactNode,
    onClick?:()=>void
}
const AsLink = (props: Props): JSX.Element => {
  const { text, onClick } = props
  return (
    <span styleName='AsLink' onClick={onClick}>
      <p className='AsLink_text'>{text}</p>
    </span>
  )
}

export default AsLink
