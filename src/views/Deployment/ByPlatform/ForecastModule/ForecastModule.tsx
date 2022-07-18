import StepHeaderOfThis from '../StepHeaderOfThis'
import { FooterBar, GButton, ModelOpreationTitle } from '@src/UIComponents'
import { useMemo, useState } from 'react'
import { APP_ForecastModule, APP_SelectModule } from '@router'
import { useNavigate } from 'react-router-dom'
import CommonUpload from './commonUpload'
import { ReactComponent as UploadIcon } from './icon/upload-cloud.svg'
import ResultViews from './ResultViews'
import './ForecastModule.module.less'

const ForecastModule = (): JSX.Element => {
  const [currentForecast, setCurrentForecast] = useState<any>({})

  const navigate = useNavigate()
  const rightContent = useMemo(() => {
    const handleGoback = () => {
      navigate({
        pathname: APP_SelectModule
      })
    }

    const goNext = async () => {
      // const _obj = Object.assign({}, createInfo, { scenes: activeType })
      // 发送给socket next

      navigate({
        pathname: APP_ForecastModule
      })
    }
    return (
      <div className='footer_btn_wrap'>
        <GButton className='previous_btn' style={{ width: 132 }} type='default' onClick={handleGoback}>上一步</GButton>
        <GButton style={{ width: 132 }} type='primary' onClick={goNext}>下一步</GButton>
      </div>
    )
  }, [navigate])
  return (
    <div styleName='ForecastModule'>
      <div className='ForecastModule_wrap'>
        <StepHeaderOfThis />
        <div className='app_forecast_from_wrap'>
          <div className='upload_container'>
            <ModelOpreationTitle text='上传预测文件'/>
            <div className='tips_wrap'>
              <p>
                              单次预测项目总数量不多于20个，单张图片不大于10 MB，单个视屏不大于100 MB.
              </p>
              <p>
                              支持.jpg .jpge . png .mp4
              </p>
            </div>
            <div>
              <CommonUpload setCurrentForecast={setCurrentForecast}>
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
