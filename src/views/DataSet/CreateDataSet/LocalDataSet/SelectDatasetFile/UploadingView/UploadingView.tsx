import { Progress } from 'antd'
import { bytesToSize } from '@src/utils'
import './UploadingView.module.less'

type Props = {
  fileInfo: any,
  percent: any,
  timeRef: any,
  handleCnasel: any
}
const UploadingView = (props: Props): JSX.Element => {
  const { fileInfo, percent, timeRef, handleCnasel } = props
  const {
    pre,
    next,
    preLoad,
    nextLoad
  } = timeRef.current

  const rate = (nextLoad - preLoad) / ((next - pre))
  const getText = () => {
    if (percent === 0) {
      return '文件校验中'
    }

    return ` 已上传：${percent}%`
  }
  return (
    <div className='UploadingView' styleName='UploadingView'>
      <div className='data-info'>
        <div><span>{fileInfo.name}</span></div>

        <div className='cansel' onClick={handleCnasel} >取消</div>
      </div>

      <div className='upload-info'>
        <div className='upload-info-left'>
          <div>
            {bytesToSize(fileInfo.size)}
          </div>
          <div>
            {getText()}
          </div>

        </div>
        <div className='upload-info-right'>{`${bytesToSize(rate) || 0}/s`}</div>

      </div>

      <div className='progress-info'>
        <Progress
          status='active'
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={percent}
        />
      </div>
    </div>
  )
}

export default UploadingView
