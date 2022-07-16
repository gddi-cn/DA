import StepHeaderOfThis from '../StepHeaderOfThis'
import './SetModuleConfig.module.less'

const SetModuleConfig = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='SetModuleConfig'>
      <div className='SetModuleConfig_wrap'>
        <StepHeaderOfThis />
      </div>
    </div>
  )
}

export default SetModuleConfig
