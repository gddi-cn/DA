
import type TaskSlice from '@src/controller/reducer/tasksSilce/taskSlice'
import { Image } from 'antd'
import { ReactComponent as ChipSvg } from './icon/chip.svg'
import datasetDefault from './icon/default.svg'
import moment from 'moment'

import './TaskItemDetail.module.less'

// 貌似里边需要很多细节额、如果是进行中的话、似乎需要更新很多信息
type Props={
  data: TaskSlice.taskListItem
}
const TaskItemDetail = (props: Props): JSX.Element => {
  console.log(props)
  const { data } = props
  const getStatus = () => {
    if (!data?.additional) {
      return null
    }
    const { additional: { status, eta } } = data
    if (status === 0) {
      return <div className='btn success'>未开始训练</div>
    }

    if (status === 1) {
      const getTime = () => {
        if (!eta) {
          return '计算中...'
        }
        if (eta === 0) {
          return '计算中...'
        }
        const ms = eta * 60 * 1000
        const d = moment.duration(ms);
        const h = Math.floor(d.asHours())
        const m = moment.utc(ms).format('m');
        if (h > 0 && +m === 0) {
          return h + '小时'
        }

        if (+h === 0) {
          return m + '分钟'
        }
        return h + '小时' + m + '分钟'
      }
      return (
        <div className='btn training'>预计完成训练还需:{getTime()}</div>
      )
    }
    if (status === 2) {
      return (
        <div className='btn success'>训练成功</div>
      )
    }
    if (status === 6) {
      return (
        <div className='btn wait'>

          等待中
        </div>
      )
    }
    if (status === 3) {
      return (
        <div className='btn failed'>

          训练失败
        </div>
      )
    }
  }

  const getModelTypeCls = (suffix:string) => {
    let cls = ''
    if (!data?.additional) {
      return cls
    }
    const { additional: { status } } = data
    if (status === 0) {
      cls = 'un_start'
    }

    if (status === 1) {
      cls = 'training'
    }
    if (status === 2) {
      cls = 'success'
    }
    if (status === 6) {
      cls = 'wait'
    }
    if (status === 3) {
      cls = 'failed'
    }

    return cls + suffix
  }

  const getPlatform = () => {
    try {
      if (data?.additional?.platform) {
        return (JSON.parse(data?.additional?.platform))?.join(' ')
      }
      return '--'
    } catch (e) {
      return '--'
    }
  }
  return (
    <div styleName='TaskItemDetail'>
      <div className={`TaskItemDetail_inner ${getModelTypeCls('_info_wrap')}`}>
        <div className='TaskItemDetail_info_wrap'>
          <div className='top_wrap'>
            {getStatus()}
          </div>

          <div className='middle_wrap'>
            <div className='task_name'>{data?.name || '--'}</div>

          </div>

          <div className='bottom_wrap'>
            <div className={`model_type ${getModelTypeCls('')}`}>
              {data?.additional?.model_type || '未知'}
            </div>
            <div className='platform'>
              <ChipSvg className='ChipSvg'/>
              <p>
                {getPlatform()}
              </p>
            </div>
          </div>
        </div>
        <div className='TaskItemDetail_img_wrap'>
          <Image
            preview={false}
            src={data?.additional?.cover}
            alt='img'
            fallback={datasetDefault}
          />
        </div>
      </div>

    </div>
  )
}

export default TaskItemDetail
