import api from '@api'
import { useState, useEffect, useRef, useCallback } from 'react'
import { GButton } from '@src/UIComponents'
// import StepProgress from './StepProgress'
// import ModelDetailType from '../../types'
// import FlvMp4 from './FlvMp4'
import ForceAutoPlayVedio from './ForceAutoPlayVedio'
// import { ReactComponent as Shujuzhunbei } from './icon/1.svg'
// import { ReactComponent as Shujuchuli } from './icon/2.svg'
// import { ReactComponent as Shujuzhuanhuan } from './icon/3.svg'
// import { ReactComponent as Moxingsousuo } from './icon/4.svg'
// import { ReactComponent as Moxingxunlian } from './icon/5.svg'
// import { ReactComponent as Moxingtiaoyou } from './icon/6.svg'
// import { ReactComponent as Moxingshengc } from './icon/7.svg'
import { setVersionInfo } from '@reducer/modelDetailSlice'
import { ReactComponent as Failed } from './icon/failed.svg'
import { socketPushMsgForProject } from '@ghooks'
import { RootState } from '@reducer/index'
import { checkoutTask } from '@reducer/tasksSilce'
import { useSelector, useDispatch } from 'react-redux'
import './TrianFlow.module.less'
import { message } from 'antd'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'

import Pending from './Pending'
import { currentModelIdAtom, currentModelVersionIdAtom } from '@src/store/dataset'
import { useAtomValue } from 'jotai'
import produce from 'immer'

// const IconMap: any = {
//   数据准备: 'https://s3.local.cdn.desauto.net/public/video/8740e037eeba8acf4b009b3e65627c6f.mp4',
//   数据评估: 'https://s3.local.cdn.desauto.net/public/video/2fc77123ede372d895ef28b3b8aea97f.mp4',
//   数据优化: 'https://s3.local.cdn.desauto.net/public/video/d589c2c5a4c4b0a6071179310d7bab68.mp4',
//   模型搜索: 'https://s3.local.cdn.desauto.net/public/video/4fa6d2a746a3508bc7ffa2a436028b12.mp4',
//   模型训练: 'https://s3.local.cdn.desauto.net/public/video/efd8588863102d84f4b9609206ad93b5.mp4',
//   模型调优: 'https://s3.local.cdn.desauto.net/public/video/64ff0211ca0df421423668a1f1db485f.mp4',
//   模型生成: 'https://s3.local.cdn.desauto.net/public/video/1d38699fbe9e718b964643076aa59a29.mp4',
// }

const TrianFlow = (): JSX.Element => {
  // const { id } = props
  const [trainInfo, setTrainInfo] = useState<any>()
  const { progress, status } = trainInfo || {}
  const dispatch = useDispatch()
  const timer = useRef<any>(null)

  const model_id = useAtomValue(currentModelIdAtom)
  const currentVersionId = useAtomValue(currentModelVersionIdAtom)

  const task_id = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const initVersionData = useCallback(
    async () => {
      try {
        if (!currentVersionId) {
          return
        }

        const iterInfoRes = await api.get(`/v2/models/${model_id}/versions/${currentVersionId}`)
        if (iterInfoRes.code === 0) {
          const iterInfo = iterInfoRes.data
          dispatch(setVersionInfo(iterInfo))
        }
      } catch (e) {
        console.error(e)
      }
    }, [
    currentVersionId, dispatch, model_id
  ]
  )

  const getTrainInfo = useCallback(
    async () => {
      if (!currentVersionId) {
        return
      }
      try {
        const res = await api.get(`/v3/models/${model_id}/versions/${currentVersionId}/progress`)
        if (res.code === 0) {
          setTrainInfo(produce(_ => res?.data))
        }
      } catch (e) {

      }
    }, [currentVersionId, model_id]
  )

  useEffect(() => {
    getTrainInfo()
    timer.current = setInterval(getTrainInfo, 10000)

    return () => {
      clearInterval(timer.current)
    }
  }, [getTrainInfo])

  useEffect(() => {
    if (!trainInfo) {
      return
    }
    const {
      status
    } = trainInfo

    if ([2].includes(status)) {
      initVersionData()
    }
  }, [trainInfo, initVersionData])

  // const getview = () => {
  //   if (!trainInfo) {
  //     return null
  //   }
  //   const {
  //     current, flows, progress
  //   } = trainInfo
  //   return (
  //     <StepProgress flows={flows} current={current} progress={progress}/>
  //   )
  // }

  const handleDetele = async () => {
    // /v2/models/{id}/versions/{version_id}
    try {
      const res = await api.delete(`/v2/models/${model_id}/versions/${currentVersionId}`)
      if (res.code === 0) {
        const updateSnapRes = await api.patch(`/v3/projects/${task_id}`, {
          dataset: {
            id: '0'
          },
          model: {
            id: '0',
            version_id: '0'
          },
        })
        if (updateSnapRes?.code === 0) {
          dispatch(checkoutTask(updateSnapRes.data))
          socketPushMsgForProject(
            activePipeLine,
            {
              active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATA_SET_INDEX,
              APP_DATA_SET_INDEX: null,
              APP_MODEL_TRAIN_CONFIG: null,
              APP_MODEL_TRAIN_DETAIL: null
            }
          )
        } else {
          message.error(updateSnapRes?.message)
        }
      } else {
        message.error(res?.message || '删除失败')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleReTrain = async () => {
    // /v3/models/{id}/versions/{version_id}/retry
    try {
      const res = await api.post(`/v3/models/${model_id}/versions/${currentVersionId}/retry`)
      if (res.code === 0) {
        getTrainInfo()
      } else {
        message.error(res?.message || '训练失败')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getAnimationsView = () => {
    if (!trainInfo) {
      return <Pending />
    }

    if (status === 6) {
      return <Pending />
    }

    if (status === 3) {
      return (
        <div className='failed_wrap'>
          <div className='failed_icon'>
            <Failed />
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
      <div className='flows_wrap'>
        <ForceAutoPlayVedio progress={progress || 0} />
        {/* {IconMap[flows[current]] || null} */}
      </div>
    )
  }

  return (
    <div styleName='TrianFlow'>
      {/* <div className='icon_wrap'>
        {getIconView()}
      </div> */}
      {getAnimationsView()}
      {/* <div className='step_wrap'>
        {
          getview()
        }
      </div> */}
    </div>
  )
}

export default TrianFlow
