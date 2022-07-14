
import './ModelOpreationTitle.module.less'
type Props ={
    text:React.ReactNode
}
const ModelOpreationTitle = (props: Props): JSX.Element => {
  const { text } = props
  return (
    <div styleName='ModelOpreationTitle'>
      {text}
    </div>
  )
}

export default ModelOpreationTitle
