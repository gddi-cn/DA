import { useState } from 'react'
import { ReactComponent as Frame } from './icon/Frame.svg'
import './IsEchartViewButton.module.less'
type Props ={
    onClick?:()=>void
}
const IsEchartViewButton = (props: Props): JSX.Element => {
  const { onClick } = props
  const [text, setText] = useState('柱状视图')

  const handleClick = () => {
    if (text === '柱状视图') {
      setText('列表视图')
    } else {
      setText('柱状视图')
    }
    onClick && onClick()
  }
  return (
    <div styleName='IsEchartViewButton' onClick={handleClick}>
      <Frame className='bar_chart' />
      <p>{text}</p>
    </div>
  )
}

export default IsEchartViewButton
