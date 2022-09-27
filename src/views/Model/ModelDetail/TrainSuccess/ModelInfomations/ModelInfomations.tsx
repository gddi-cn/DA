
import { Collapse, Progress, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './ModelInfomations.module.less'

const { Panel } = Collapse;
const mode_text = ['', '速度优先', '精度优先', '自定义']
const ModelInfomations = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  console.log(versionInfo)

  if (!versionInfo?.iter) {
    return <></>
  }

  const { iter } = versionInfo
  const { app_data_args, gpu_count, platform, channel = 1, mode = 1 } = iter
  const platformlist = JSON.parse(platform)
  const { fps = 5 } = JSON.parse(app_data_args)
  const getTime = () => {
    const { begin, end } = versionInfo.iter
    let valueList: any = []
    const ms = +end * 1000 - 1000 * +begin
    const d = moment.duration(ms);
    const h = Math.floor(d.asHours())
    const m = moment.utc(ms).format('m');

    valueList = [
      // `${0}元`,
      h + '小时' + m + '分钟',
      moment(+begin * 1000).format('YYYY-MM-DD'),
      moment(+begin * 1000).format('HH:mm:ss'),
    ]

    return valueList
  }

  const getPercent = (per: any) => {
    if (per) {
      const num = per * 100
      return (num as number).toFixed(0) + '%'
    }
    return '-%'
  }
  const [duration, day, time] = getTime()
  return (
    <div styleName='ModelInfomations'>
      <Collapse defaultActiveKey={['1']} expandIconPosition='end' >
        <Panel header="模型信息" key="1">
          <div className='btm_content_chip_wrap'>
            <div className='top_content_wrap_item'>
              <p>开始日期：</p>
              <p>{day}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>开始时间：</p>
              <p>{time}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>训练时长：</p>
              <p>{duration}</p>
            </div>

            <div className='Progress_wrap'>
              <Progress
                strokeLinecap="butt"
                type="circle"
                percent={versionInfo?.iter?.result?.accuracy ? +(versionInfo?.iter?.result?.accuracy * 100).toFixed(0) : 0}
                strokeColor='#48A2DF'
                trailColor='#97CAEC'
                strokeWidth={10}
                format={percent => {
                  return (
                    <div className='pro_text_wrap'>

                      <p className='percent_text'>
                        {`${percent}%`}
                      </p>
                      <Tooltip title='mAP50，所有样本中，模型正确预测的样本比率，反映模型对样本整体的识别能力。'>
                        <p className='tips'>
                          <InfoCircleOutlined />  准确率
                        </p>
                      </Tooltip>

                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className='btm_content_chip_wrap'>
            <div className='top_content_wrap_item'>
              <p>芯片品牌：</p>
              <p>{platformlist[0]}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>芯片型号：</p>
              <p>{platformlist[1]}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>加速器类型：</p>
              <p>{platformlist[2]}</p>
            </div>
          </div>

          <div className='btm_content_wrap'>
            <div className='top_content_wrap_item'>
              <p>GPU数：</p>
              <p>{gpu_count}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>模式：</p>
              <p>{mode_text[mode]}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>FPS：</p>
              <p>{fps}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>单芯片路数：</p>
              <p>{channel}</p>
            </div>
          </div>
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={['1']} expandIconPosition='end' >
        <Panel header="验证集评估结果" key="1">

          <div className='btm_content_wrap'>
            <div className='top_content_wrap_item result_wrap'>
              <p>准确率：</p>
              <p>  {getPercent(versionInfo?.iter?.result?.accuracy)}</p>

              <Tooltip title='mAP50，所有样本中，模型正确预测的样本比率，反映模型对样本整体的识别能力。'>
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div className='top_content_wrap_item result_wrap'>
              <p>召回率：</p>
              <p> {getPercent(versionInfo?.iter?.result?.recall)}</p>

              <Tooltip title='Recall，也称检出率，在给定置信度阈值下，所有目标正样本中，模型预测正确的比率，反映模型对目标正样本的识别能力。'>
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div className='top_content_wrap_item result_wrap'>
              <p>精准率：</p>
              <p> {getPercent(versionInfo?.iter?.result?.precision)}</p>

              <Tooltip title='Precision，也称非误检率，在给定置信度阈值下，模型预测的所有样本中，正确识别的比率，反映模型对负样本的区分能力。'>
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default ModelInfomations
