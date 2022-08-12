import { GButton } from '@src/UIComponents'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo } from 'react'
import api from '@api'
import { useLocation } from 'react-router-dom'
import { APP_MODEL_TRAIN_DETAIL } from '@router'
import { setCurrentVersion } from '@reducer/modelDetailSlice'
import { socketPushMsgForProject } from '@ghooks'
import './ModelIterrator.module.less'
import { message } from 'antd'

const ModelIterrator = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { pathname } = location
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })

  const gpu_count = useSelector((state: RootState) => {
    return state.modelDetailSlice?.versionInfo?.iter?.gpu_count || 0
  })

  const status = useSelector((state: RootState) => {
    return state.modelDetailSlice?.versionInfo?.iter?.status || 0
  })

  const Button = useMemo(() => {
    if (activePipeLine?.APP_MODEL_TRAIN_DETAIL?.id) {
      if (pathname !== APP_MODEL_TRAIN_DETAIL) {
        return null
      }

      if (status !== 2) {
        return null
      }
      const { id, version_id } = activePipeLine.APP_MODEL_TRAIN_DETAIL
      const handleIter = async () => {
        try {
          const res = await api.post(`/v3/models/${id}/versions/${version_id}/increase`, { gpu_count: gpu_count })
          if (res?.code === 0) {
            message.success('模型正在迭代')
            const { version_id } = res.data

            if (activePipeLine.APP_MODEL_TRAIN_DETAIL) {
              const _data = Object.assign({ ...activePipeLine.APP_MODEL_TRAIN_DETAIL }, { version_id })
              socketPushMsgForProject(activePipeLine, {
                APP_MODEL_TRAIN_DETAIL: _data
              })
            }

            dispatch(setCurrentVersion(res.data))
          } else {
            message.error(res?.message)
          }
        } catch (e:any) {
          message.error(e?.message)
        }
      }
      return (
        <GButton className='ModelIterrator_btn' type='primary' onClick={handleIter}>迭代</GButton>
      )
    }
    return null
  }, [activePipeLine, pathname, status, gpu_count, dispatch])

  return (
    <div styleName='ModelIterrator'>
      {
        Button
      }
    </div>
  )
}

export default ModelIterrator
