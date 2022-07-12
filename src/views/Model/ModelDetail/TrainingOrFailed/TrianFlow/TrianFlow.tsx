import api from '@api'
import { useState, useEffect, useRef } from 'react'

import StepProgress from './StepProgress'
import ModelDetailType from '../../types'

import { ReactComponent as Shujuzhunbei } from './icon/1.svg'
import { ReactComponent as Shujuchuli } from './icon/2.svg'
import { ReactComponent as Shujuzhuanhuan } from './icon/3.svg'
import { ReactComponent as Moxingsousuo } from './icon/4.svg'
import { ReactComponent as Moxingxunlian } from './icon/5.svg'
import { ReactComponent as Moxingtiaoyou } from './icon/6.svg'
import { ReactComponent as Moxingshengc } from './icon/7.svg'
import './TrianFlow.module.less'

const IconMap: any = {
  数据准备: <Shujuzhunbei />,
  数据评估: <Shujuchuli />,
  数据优化: <Shujuzhuanhuan />,
  模型搜索: <Moxingsousuo />,
  模型训练: <Moxingxunlian />,
  模型调优: <Moxingtiaoyou />,
  模型生成: <Moxingshengc />,
}

const TrianFlow = (props: ModelDetailType.TrianFlowProps): JSX.Element => {
  const { id, currentVersion } = props
  const [trainInfo, setTrainInfo] = useState<any>()

  const timer = useRef<any>(null)
  useEffect(() => {
    const getTrainInfo = async () => {
      try {
        const res = await api.get(`/v3/models/${id}/versions/${currentVersion?.id}/progress`)
        if (res.code === 0) {
          setTrainInfo(res?.data)
        }
      } catch (e) {

      }
    }

    getTrainInfo()
    timer.current = setInterval(getTrainInfo, 10000)

    return () => {
      clearInterval(timer.current)
    }
  }, [currentVersion, id])

  useEffect(() => {
    if (!trainInfo) {
      return
    }
    const {
      status
    } = trainInfo
    console.log(status, 'status')
    if (![1, 6].includes(status)) {
      window.location.reload()
      console.log(status, 'status')
      console.log([1, 6].includes(status), status)
    }
  }, [trainInfo])

  const getview = () => {
    if (!trainInfo) {
      return null
    }
    const {
      current, flows, progress
    } = trainInfo
    return (
      <StepProgress flows={flows} current={current} progress={progress}/>
    )
  }

  const getIconView = () => {
    if (!trainInfo) {
      return null
    }
    const {
      current, flows
    } = trainInfo
    return IconMap[flows[current]] || null
  }
  return (
    <div styleName='TrianFlow'>
      <div className='icon_wrap'>
        {getIconView()}
      </div>
      <div className='step_wrap'>
        {
          getview()
        }
      </div>
    </div>
  )
}

export default TrianFlow
