
import './Title.module.less'

type Props={
    text?:React.ReactNode,
    errText?: React.ReactNode,
}
const Title = (props: Props): JSX.Element => {
  const { text, errText } = props
  return (
    <div styleName='Title'>
      <p className='title_text'>
        {text}
      </p>
      <p className='err_text'>{errText}</p>
    </div>
  )
}

export default Title
