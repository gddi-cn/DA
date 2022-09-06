import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton, ModelOpreationTitle } from '@src/UIComponents'
import { useMemo, useState } from 'react'
import { APP_SelectDevice, APP_SetModuleConfig } from '@router'
import { useNavigate } from 'react-router-dom'
import CommonUpload from './commonUpload'
import { ReactComponent as UploadIcon } from './icon/upload-cloud.svg'
import ResultViews from './ResultViews'

import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import { socketPushMsgForProject } from '@ghooks'
import './ForecastModule.module.less'

const ForecastModule = (): JSX.Element => {
  const [currentForecast, setCurrentForecast] = useState<any>({})

  const app_id = useSelector((state: RootState) => {
    const { activePipeLine } = state.tasksSilce
    if (activePipeLine) {
      if (activePipeLine?.APP_SetModuleConfig?.id) {
        return activePipeLine?.APP_SetModuleConfig?.id
      }
    }
    return undefined
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const navigate = useNavigate()
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SetModuleConfig
      })
      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SetModuleConfig
        }
      )
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next

      navigate({
        pathname: APP_SelectDevice
      })
      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SelectDevice
        }
      )
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [activePipeLine, navigate])
  return (
    <div styleName='ForecastModule'>
      <div className='ForecastModule_wrap'>
        <StepHeaderOfThis />
        <div className='app_forecast_from_wrap'>
          <div className='upload_container'>
            <ModelOpreationTitle text='上传预测文件'/>
            <div className='tips_wrap'>
              <p>
                单次预测项目总数量不多于20个，单张图片不大于10 MB，单个视频不大于100 MB.
              </p>
              <p>
                支持.jpg.jpeg . png
              </p>
            </div>
            <div>
              <CommonUpload setCurrentForecast={setCurrentForecast} app_id={app_id}>
                <div className='upload_views'>
                  <UploadIcon />
                  <p>
                                      将文件拖到此处
                  </p>
                  <p>
                                      或点击上传
                  </p>
                </div>
              </CommonUpload>
            </div>
          </div>
          <div className='result_container'>
            <ResultViews currentForecast={currentForecast} />
          </div>
        </div>
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default ForecastModule
