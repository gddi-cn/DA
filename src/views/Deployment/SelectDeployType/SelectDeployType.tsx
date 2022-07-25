
import ByDemo from '../ByDemo'
import { ReactComponent as Pingtai } from './icon/pingtai.svg'
import { ReactComponent as Sdk } from './icon/sdk.svg'
import { useNavigate } from 'react-router-dom'
import { APP_SelectModule, APP_SDK_Documents } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './SelectDeployType.module.less'

const SelectDeployType = (): JSX.Element => {
  const navigate = useNavigate()
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  const getHeader = (text: string) => {
    return (
      <div className='getHeader'>{text}</div>
    )
  }

  const handleGotoPlatform = () => {
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SelectModule
      }
    )
    navigate(
      {
        pathname: APP_SelectModule
      }
    )
  }

  const handleGotoSDK = () => {
    navigate({
      pathname: APP_SDK_Documents
    })
    socketPushMsgForProject(
      activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SDK_Documents
      }
    )
  }
  return (
    <div styleName='SelectDeployType'>
      <div className='SelectDeployType_wrap'>
        <div className='demo_wrap'>
          {
            getHeader('Demo模型')
          }

          <div className='demo_detail_wrap'>
            <ByDemo />

          </div>
        </div>
        <div className='product_wrap'>
          {
            getHeader('部署模型至生产')
          }

          <div className='product_detail_wrap'>
            <div className='type_item_wrap product_detail_wrap_item' onClick={handleGotoSDK}>
              <div className='type_item_wrap_top'>
                <Sdk></Sdk>
              </div>
              <div className='type_item_wrap_mddle'>
                                SDK部署
              </div>
              <div className='type_item_wrap_bottom'>
                                我们提供适配多种芯片的“模型推理SDK”，您可以下载适合您硬件的SDK，开始任意的开发。
              </div>

            </div>
            <div className='type_item_wrap product_detail_wrap_item' onClick={handleGotoPlatform}>
              <div className='type_item_wrap_top'>
                <Pingtai></Pingtai>
              </div>
              <div className='type_item_wrap_mddle'>
                                应用平台部署
              </div>
              <div className='type_item_wrap_bottom'>
                                无需二次开发，使用「GDDi应用平台」即可以运行模型；「应用平台」还支持多项生产级功能，例如“零代码将AI模型编排为应用”，配置“事件上报”等。
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectDeployType
