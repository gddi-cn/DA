import api from '@api'
import { useState, useEffect, useRef } from 'react'
import { GButton } from '@src/UIComponents'
import StepProgress from './StepProgress'
import ModelDetailType from '../../types'
import FlvMp4 from './FlvMp4'
// import { ReactComponent as Shujuzhunbei } from './icon/1.svg'
// import { ReactComponent as Shujuchuli } from './icon/2.svg'
// import { ReactComponent as Shujuzhuanhuan } from './icon/3.svg'
// import { ReactComponent as Moxingsousuo } from './icon/4.svg'
// import { ReactComponent as Moxingxunlian } from './icon/5.svg'
// import { ReactComponent as Moxingtiaoyou } from './icon/6.svg'
// import { ReactComponent as Moxingshengc } from './icon/7.svg'

import { ReactComponent as Failed } from './icon/failed.svg'

import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './TrianFlow.module.less'

const IconMap: any = {
  数据准备: 'https://s3.local.cdn.desauto.net/public/video/8740e037eeba8acf4b009b3e65627c6f.mp4',
  数据评估: 'https://s3.local.cdn.desauto.net/public/video/2fc77123ede372d895ef28b3b8aea97f.mp4',
  数据优化: 'https://s3.local.cdn.desauto.net/public/video/d589c2c5a4c4b0a6071179310d7bab68.mp4',
  模型搜索: 'https://s3.local.cdn.desauto.net/public/video/4fa6d2a746a3508bc7ffa2a436028b12.mp4',
  模型训练: 'https://s3.local.cdn.desauto.net/public/video/efd8588863102d84f4b9609206ad93b5.mp4',
  模型调优: 'https://s3.local.cdn.desauto.net/public/video/64ff0211ca0df421423668a1f1db485f.mp4',
  模型生成: 'https://s3.local.cdn.desauto.net/public/video/1d38699fbe9e718b964643076aa59a29.mp4',
}

const TrianFlow = (props: ModelDetailType.TrianFlowProps): JSX.Element => {
  const { id } = props
  const [trainInfo, setTrainInfo] = useState<any>()

  const timer = useRef<any>(null)

  const currentVersion = useSelector((state: RootState) => {
    return state.modelDetailSlice.currentVersion
  })
  useEffect(() => {
    const getTrainInfo = async () => {
      if (!currentVersion?.id) {
        return
      }
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

    if (![1, 2, 6].includes(status)) {
      window.location.reload()
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

  const handleDetele = () => {
    console.log(1)
  }

  const handleReTrain = () => {
    console.log(1)
  }

  const getIconView = () => {
    if (!trainInfo) {
      return null
    }
    const {
      current, flows, status
    } = trainInfo

    if (status === 3) {
      return (
        <div>
          <div className='failed_icon'>
            <Failed/>
          </div>
          <div className='tips'>
                  抱歉！训练失败
          </div>
          <div className='btn_wrap'>
            <GButton className='close_btn' onClick={handleDetele}>删除</GButton>
            <GButton className='new_btn' onClick={handleReTrain}>重新训练</GButton>
          </div>
        </div>
      )
    }
    return (
      <div className='icon_wrap'>
        <FlvMp4 src={IconMap[flows[current]]} />
        {/* {IconMap[flows[current]] || null} */}
      </div>
    )
  }
  return (
    <div styleName='TrianFlow'>
      {/* <div className='icon_wrap'>
        {getIconView()}
      </div> */}
      {getIconView()}
      <div className='step_wrap'>
        {
          getview()
        }
      </div>
    </div>
  )
}

export default TrianFlow
