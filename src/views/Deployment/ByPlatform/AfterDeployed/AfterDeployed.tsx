import StepHeaderOfThis from '../StepHeaderOfThis'
import { ReactComponent as SuccessSvg } from './icon/undraw_done_re_oak4 1.svg'
import './AfterDeployed.module.less'

const AfterDeployed = (props: any): JSX.Element => {
  console.log(props)

  return (
    <div styleName='AfterDeployed'>
      <div className='AfterDeployed_wrap'>
        <StepHeaderOfThis />
        <div className='AfterDeployed_wrap_content'>
          <SuccessSvg />

          <div className='tips'>
            部署成功,请前往推理平台查看.
          </div>

          <div className='download_btn'>
                      推理平台使用手册
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfterDeployed
