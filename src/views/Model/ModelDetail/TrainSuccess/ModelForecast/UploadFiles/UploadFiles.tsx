import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import CommonUpload from './commonUpload'
import SingleEyeAssessment from './SingleEyeAssessment'
import { InputNumber, Spin } from 'antd'
import { RootState } from '@reducer'
import { useSelector } from 'react-redux'
import { ModelOpreationTitle } from '@src/UIComponents'
import './UploadFiles.module.less'
import { DatasetScene } from '@src/shared/enum/dataset'

const UploadFiles = (props:any): JSX.Element => {
  const { fetchResult } = props
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const { model_type } = versionInfo
  const [thres, setthres] = useState('0')
  const deferThres = useDeferredValue(thres)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const best_threshold = versionInfo?.iter?.result?.best_threshold
    setthres(best_threshold)
  }, [versionInfo])

  const handleOnChange = (v: string | null) => {
    setthres(v || '')
  };

  console.log(deferThres)

  const view = useMemo(() => {
    if (model_type === 'monocular_3d_detection') {
      return (
        <SingleEyeAssessment thres={thres} setLoading={setLoading} />
      )
    }
    return (
      <CommonUpload thres={thres} setLoading={setLoading} fetchResult={fetchResult} model_type={model_type}/>
    )
  }, [thres, model_type, fetchResult])
  return (
    <div styleName='UploadFiles'>
      <Spin spinning={loading} tip='正在上传文件...'>
        {
          (model_type && (model_type as DatasetScene) === DatasetScene.Classify) ? null : (
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="阈值设置"></ModelOpreationTitle>
              <div className='input_content'>
                <InputNumber
                  placeholder="请输入阈值"
                  onChange={handleOnChange}
                  min="0"
                  value={thres}
                  max="1"
                  step="0.05" />
              </div>
            </div>
          )
        }

        <div className='forecast_paramas_block'>

          <ModelOpreationTitle text="上传文件"></ModelOpreationTitle>
          <div className='upload_content'>
            {view}
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default UploadFiles
