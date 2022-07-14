import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import CommonUpload from './commonUpload'
import SingleEyeAssessment from './SingleEyeAssessment'
import { InputNumber, Spin } from 'antd';
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './UploadFiles.module.less'

const UploadFiles = (): JSX.Element => {
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

  const handleOnChange = (v: string) => {
    setthres(v)
  };

  console.log(deferThres)

  const view = useMemo(() => {
    if (model_type === 'monocular_3d_detection') {
      return (
        <SingleEyeAssessment thres={thres} setLoading={setLoading} />
      )
    }
    return (
      <CommonUpload thres={thres} setLoading={setLoading} />
    )
  }, [thres, model_type])
  return (
    <div styleName='UploadFiles'>
      <Spin spinning={loading} tip='正在上传文件...'>
        <div className='forecast_paramas_block'>
          <div className='title'>
            阈值设置
          </div>
          <div className='input_content'>
            <InputNumber placeholder="请输入阈值" onChange={handleOnChange} min="0" value={thres}
              max="1"
              step="0.05" />
          </div>
        </div>

        <div className='forecast_paramas_block'>
          <div className='title'>
            上传文件
          </div>
          <div className='upload_content'>
            {view}
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default UploadFiles
