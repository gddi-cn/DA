import { GButton } from '@src/UIComponents'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@reducer/index'
import { useMemo } from 'react'
import api from '@api'
import { useLocation } from 'react-router-dom'
import { APP_MODEL_TRAIN_DETAIL } from '@router'
import { setCurrentVersion, setVersionList } from '@reducer/modelDetailSlice'
import { socketPushMsgForProject } from '@ghooks'
import { message, Popconfirm } from 'antd'
import './ModelIterrator.module.less'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import modelAPI from '@src/apis/model'
import projectAPI from '@src/apis/project'
import { checkoutTask } from '@src/controller/reducer/tasksSilce'

const ModelIterrator = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { pathname } = location
  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine
  })

  const taskId = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })

  const gpu_count = useSelector((state: RootState) => {
    return state.modelDetailSlice?.versionInfo?.iter?.gpu_count || 0
  })

  const status = useSelector((state: RootState) => {
    return state.modelDetailSlice?.versionInfo?.iter?.status || 0
  })

  const model_type = useSelector((state: RootState) => {
    return state.modelDetailSlice?.versionInfo?.iter?.model_type || 'unknow'
  })

  const Button = useMemo(() => {
    if (activePipeLine?.APP_MODEL_TRAIN_DETAIL?.id) {
      if (pathname !== APP_MODEL_TRAIN_DETAIL) {
        return null
      }

      if (status !== 2) {
        return null
      }
      // detection: '目标检测',
      //   classify: '图片分类',

      if (!['detection', 'classify'].includes(model_type)) {
        return null
      }
      const { id } = activePipeLine.APP_MODEL_TRAIN_DETAIL

      const handleIter = async () => {
        const { success, data } = await modelAPI.versionList(id)
        if (!success || !data?.versions?.length) return

        const laestVersion = data.versions.sort((a, b) => parseInt(a.created) - parseInt(b.created)).reverse()[0]
        const versionId = laestVersion.id
        if (!versionId) return

        try {
          const res = await api.post(`/v3/models/${id}/versions/${versionId}/increase`, { gpu_count: gpu_count })

          if (res?.code === 0) {
            message.success('模型正在迭代')
            const { version_id } = res.data

            if (activePipeLine.APP_MODEL_TRAIN_DETAIL) {
              const _data = Object.assign({ ...activePipeLine.APP_MODEL_TRAIN_DETAIL }, { version_id })
              socketPushMsgForProject(activePipeLine, {
                APP_MODEL_TRAIN_DETAIL: _data
              })
            }

            // 创建后还要重新获取最新的版本
            const { success: s, data: d } = await modelAPI.versionList(id)
            if (!s || !d?.versions?.length) return
            const l = d.versions.sort((a, b) => parseInt(a.created) - parseInt(b.created)).reverse()[0]

            dispatch(setCurrentVersion(l))
            dispatch(setVersionList(data?.versions ?? []))

          } else {
            message.error(res?.message)
          }
        } catch (e: any) {
          message.error(e?.message)
        }
      }

      const handleGotoDataSet = () => {
        socketPushMsgForProject(activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_DATASET_DETAIL
        })
      }
      return (
        <Popconfirm placement="leftTop" title="是否添加数据再进行迭代？" onCancel={handleIter} onConfirm={handleGotoDataSet} okText="去添加数据" cancelText="直接迭代">
          <GButton className='ModelIterrator_btn' type='default' >迭代</GButton>
        </Popconfirm>

      )
    }
    return null
  }, [activePipeLine, pathname, status, model_type, gpu_count, dispatch])

  return (
    <div styleName='ModelIterrator'>
      {
        Button
      }
    </div>
  )
}

export default ModelIterrator
