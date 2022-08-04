import UploadFiles from './UploadFiles'
import { ReactCusScrollBar } from '@src/UIComponents'
import ForecastResult from './ForecastResult'
import './ModelForecast.module.less'
import { useMemo, useState } from 'react'

const ModelForecast = (): JSX.Element => {
  const [fetchResult, setFetchResult] = useState(undefined)
  return (
    <div styleName='ModelForecast'>
      <div className='model_info_wrap'>
        <ReactCusScrollBar id='ReactCusScrollBar' autoHide>
          <div className='ModelForecast_UploadFiles_wrap'>
            <UploadFiles fetchResult={fetchResult}/>
          </div>

        </ReactCusScrollBar>

      </div>
      <div className='ModelForecast_wrap'>
        {
          useMemo(() => {
            return <ForecastResult setFetchResult={setFetchResult}/>
          }, [])
        }

      </div>
    </div>
  )
}

export default ModelForecast
