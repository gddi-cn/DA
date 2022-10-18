import { Collapse } from 'antd';

import moment from 'moment'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './TrainInfo.module.less'

const { Panel } = Collapse;

const TrainInfo = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  const getTime = () => {
    if (!versionInfo?.iter) {
      return [
        // `${0}元`,
        '-',
        '-',
        '-'
      ]
    }
    const { begin, end, status } = versionInfo.iter
    let valueList: any = []
    if (status === 2) {
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
    } else if (status === 3) {
      valueList = [
        // `${0}元`,
        '-',
        moment(+begin * 1000).format('YYYY-MM-DD'),
        moment(+begin * 1000).format('HH:mm:ss'),
      ]
    } else if (status === 6) {
      valueList = [
        // `${0}元`,
        '-',
        '-',
        '-'
      ]
    } else {
      const ms = new Date().valueOf() - +begin * 1000
      const d = moment.duration(ms);
      const h = Math.floor(d.asHours())
      const m = moment.utc(ms).format('m');

      valueList = [
        // `${0}元`,
        h + '小时' + m + '分钟',
        moment(+begin * 1000).format('YYYY-MM-DD'),
        moment(+begin * 1000).format('HH:mm:ss'),
      ]
    }

    return valueList
  }

  const getConfig = () => {
    try {
      if (!versionInfo?.iter) {
        return [
          // `${0}元`,
          '-',
          '-',
          '-',
          '-',
          '-',
          '-',
        ]
      }

      const { app_data_args, gpu_count, platform, mode } = versionInfo.iter
      const platformlist = JSON.parse(platform)
      const { fps } = JSON.parse(app_data_args)

      return [
        ...(platformlist as any[]),
        fps,
        gpu_count,
        mode
      ]
    } catch (e) {
      return [
        // `${0}元`,
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
      ]
    }
  }
  const [duration, day, time] = getTime()

  const [
    menufacture,
    series,
    chip_type,
    fps,
    gpu_count,
    mode
  ] = getConfig()

  const text:string[] = [
    '自定义',
    '精度优先',
    '速度优先',
    '自定义'
  ]

  return (
    <div styleName='TrainInfo'>
      <Collapse defaultActiveKey={['1']} expandIconPosition='end' >
        <Panel header="训练时长" key="1">
          <div className='top_content_wrap'>
            <div className='top_content_wrap_item'>
              <p>开始日期：</p>
              <p>{day}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>开始时间：</p>
              <p>{time}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>已经历：</p>
              <p>{duration}</p>
            </div>
          </div>
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={['1']} expandIconPosition='end' >
        <Panel header="模型设置" key="1">
          <div className='btm_content_chip_wrap'>
            <div className='top_content_wrap_item'>
              <p>芯片品牌：</p>
              <p>{menufacture}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>芯片型号：</p>
              <p>{series}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>加速器类型：</p>
              <p>{chip_type}</p>
            </div>
          </div>

          <div className='btm_content_wrap'>
            <div className='top_content_wrap_item'>
              <p>GPU数：</p>
              <p>{gpu_count}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>FPS：</p>
              <p>{fps}</p>
            </div>
            <div className='top_content_wrap_item'>
              <p>模式：</p>
              <p>{text[mode]}</p>
            </div>
          </div>
        </Panel>
      </Collapse>

    </div>
  )
}

export default TrainInfo
