import { ReactComponent as Frame } from './icon/Frame.svg'
import './IsEchartViewButton.module.less'
type Props ={
    onClick?:()=>void
}
const IsEchartViewButton = (props: Props): JSX.Element => {
  const { onClick } = props
  return (
    <div styleName='IsEchartViewButton' onClick={onClick}>
      <Frame className='bar_chart' />
      <p>柱状视图</p>
    </div>
  )
}

export default IsEchartViewButton
