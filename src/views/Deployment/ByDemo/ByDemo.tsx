import { ReactComponent as Demo } from '../SelectDeployType/icon/Demo模型.svg'
import QRCode from 'qrcode.react'
import './ByDemo.module.less'

const ByDemo = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='ByDemo'>
      <div className='qr_code_wrap'>
        <QRCode value="https://app.desauto.cn" size={256} />
      </div>
      <div className='type_item_wrap'>
        <div className='type_item_wrap_top'>
          <Demo></Demo>
        </div>
        <div className='type_item_wrap_mddle'>
                  GDDi App查看模型效果
        </div>
        <div className='type_item_wrap_bottom'>
                  通过安卓应用GDDiApp，您可以在移动端通过摄像头试用您的模型，产看效果。以达到demo目的。
        </div>
        <div className='type_item_wrap_tips'>
                  ⚠️注意！此时运行在移动端的是通用模型，准确率较定制模型会有所降级.
        </div>
      </div>

    </div>
  )
}

export default ByDemo
