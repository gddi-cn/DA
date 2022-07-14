import UploadFiles from './UploadFiles'
import { ReactCusScrollBar } from '@src/UIComponents'
import ForecastResult from './ForecastResult'
import './ModelForecast.module.less'

const ModelForecast = (): JSX.Element => {
  return (
    <div styleName='ModelForecast'>
      <div className='model_info_wrap'>
        <ReactCusScrollBar id='ReactCusScrollBar' autoHide>
          <div className='ModelForecast_UploadFiles_wrap'>
            <UploadFiles />
          </div>

        </ReactCusScrollBar>

      </div>
      <div className='ModelForecast_wrap'>
        <ForecastResult />

      </div>
    </div>
  )
}

export default ModelForecast
