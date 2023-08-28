import {lazy, useCallback, useEffect, useMemo, useState} from 'react'
import {FooterBar, GButton} from '@src/UIComponents'
import {SuspenseForFC} from '@router/utils'
import api from '@api'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@reducer/index'
import {message, Modal, Skeleton} from 'antd';
import {
  initModelDetialSlice,
  setCurrentVersion,
  setModelId as setStoreModelId,
  setVersionInfo,
  setVersionList
} from '@reducer/modelDetailSlice'
import {checkoutTask} from '@reducer/tasksSilce'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import {APP_SELECT_DEPLOY_TYPE} from '@router'
import {socketPushMsgForProject} from '@ghooks'
import {SNAPSHOT_KEY_OF_ROUTER} from '@src/constants'
import './ModelDetail.module.less'
import projectAPI from '@src/apis/project'
import modelAPI from '@src/apis/model'
import { Model as EModel } from '@src/shared/enum/model'

// ?id=370695350071697408&cuurentVersionId=370695350075891712&
const { confirm } = Modal;
const TrainSuccess = lazy(() => import('@src/views/Model/ModelDetail/TrainSuccess'));
const TrainingOrFailed = lazy(() => import('@src/views/Model/ModelDetail/TrainingOrFailed'));

const ModelDetail = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const taskId = useSelector((state: RootState) => {
    return state.tasksSilce.activeTaskInfo?.id
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const [modelId, setModelId] = useState<string>('')
  const [modelVersionId, setModelVersionId] = useState<string>('')
  const [version, setVersion] = useState<Model.VersionDetail | null>(null)

  useEffect(
    () => {
      if (!taskId) return
      projectAPI
        .detail(taskId)
        .then(({ success, data }) => {
          if (!success || !data) return
          const { model } = data
          if (!model) return
          const { version_id, id } = model
          setModelId(id)
          setModelVersionId(version_id)
        })
    },
    [taskId]
  )

  useEffect(
    () => {
      if (!modelId || !modelVersionId) return
      modelAPI.versionDetail(modelId, modelVersionId)
        .then(({ success, data }) => {
          if (!success || !data) return
          setVersion(data)
        })
    },
    [modelId, modelVersionId]
  )

  const isIter = (version?.name || '') !== 'v1'

  const getModelBaseInfo = useCallback(
    async () => {
      try {
        if (!modelId || !modelVersionId) {
          return
        }
        // 后端神奇的默认
        if ((modelId as any) === '0') {
          return
        }

        dispatch(setStoreModelId(modelId))
        const { success, data } = await modelAPI.versionList(modelId)
        if (!success || !data?.versions) return
        const { versions } = data
        let _currentVersion = versions[versions.length - 1]

        if (modelVersionId) {
          const existCurrentVersion = versions.find((o: any) => o.id === modelVersionId)
          if (existCurrentVersion) {
            _currentVersion = existCurrentVersion
          }
        }

        dispatch(setVersionList(versions))
        dispatch(setCurrentVersion(_currentVersion))

      } catch (e) {

      }
    }, [dispatch, modelId, modelVersionId]
  )

  useEffect(() => {
    return () => {
      dispatch(initModelDetialSlice())
    }
  }, [dispatch])

  useEffect(() => {
    getModelBaseInfo()
  }, [getModelBaseInfo])

  const initVersionData = useCallback(
    async () => {
      try {
        if (!modelVersionId || !modelId) {
          return
        }
        const iterInfoRes = await api.get(`/v2/models/${modelId}/versions/${modelVersionId}`)
        if (iterInfoRes.code === 0) {
          const iterInfo = iterInfoRes.data
          dispatch(setVersionInfo(iterInfo))
        }
      } catch (e) {
        console.error(e)
      }
    },
    [modelVersionId, dispatch, modelId]
  )

  useEffect(() => {
    initVersionData()
  }, [initVersionData])

  const views = useMemo(() => {
    if (!version || !modelId) {
      return <Skeleton active />
    }
    const success = version?.iter?.status === EModel.TrainStatus.SUCCESS

    if (success) {
      return (
        SuspenseForFC(<TrainSuccess />)
      )
    }
    return SuspenseForFC(<TrainingOrFailed />)
  }, [version, modelId])

  // 训练失败的时候也有这个，懒得写在saga里边了
  const handleDelete = useCallback(
    () => {
      const okfn = async () => {
        try {
          const res = await api.delete(`/v2/models/${modelId}/versions/${modelVersionId}`)
          if (res.code === 0) {
            const updateSnapRes = await api.patch(`/v3/projects/${taskId}`, {
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
      confirm({
        title: '是否删除该模型?',
        icon: <ExclamationCircleOutlined />,
        content: '删除后不可恢复，请谨慎。',
        onOk() {
          console.log('OK');
          okfn()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      // /v2/models/{id}/versions/{version_id}
    }, [activePipeLine, modelVersionId, dispatch, modelId, taskId]
  )

  const handleCancel = () => {
    confirm({
      title: '取消迭代训练?',
      icon: <ExclamationCircleOutlined />,
      content: '取消后不可恢复，请谨慎。',
      onOk: async () => {
        const res = await api.delete(`/v2/models/${modelId}/versions/${modelVersionId}`)

        if (res.code !== 0) {
          message.error('取消失败')
          return
        }

        const { success, data } = await modelAPI.versionList(modelId)

        if (!success || !data?.versions?.length) return

        const laestVersion = data.versions.sort((a, b) => parseInt(a.created) - parseInt(b.created)).reverse()[0]

        const updateSnapRes = await api.patch(`/v3/projects/${taskId}`, {
          model: {
            id: modelId,
            version_id: laestVersion.id
          },
        })

        if (updateSnapRes?.code === 0) {
          dispatch(checkoutTask(updateSnapRes.data))
          dispatch(setVersionList(data.versions ?? []))
          dispatch(setCurrentVersion(laestVersion))
        }
      },
    });
  }

  const handlePause = useCallback(async () => {
    try {
      const res = await api.patch(`/v3/models/${modelId}/versions/${modelVersionId}/pause`)
      if (res.code === 0) {
        message.success('已暂停模型训练')
        initVersionData()
      } else {
        message.error(res?.message)
      }
    } catch (e) {

    }
  }, [modelVersionId, initVersionData, modelId])

  const handleResume = useCallback(async () => {
    try {
      const res = await api.patch(`/v3/models/${modelId}/versions/${modelVersionId}/resume`)
      if (res.code === 0) {
        message.success('已恢复模型训练')
        initVersionData()
      } else {
        message.error(res?.message)
      }
    } catch (e) {

    }
  }, [modelVersionId, initVersionData, modelId])

  const rightContent = useMemo(() => {
    const goNext = async () => {
      socketPushMsgForProject(
        activePipeLine, {
        active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE,
        APP_MODEL_TRAIN_DETAIL: {
          id: modelId,
          version_id: modelVersionId
        },
      }
      )
      navigate({
        pathname: APP_SELECT_DEPLOY_TYPE
      })
    }
    const status = version?.iter?.status
    const isTrainsiton = version?.iter?.status === EModel.TrainStatus.SUCCESS

    const isPause = version?.iter?.status === EModel.TrainStatus.PAUSED

    const getPauseBtn = () => {
      if (!isTrainsiton) {
        if (isPause) {
          return (
            <GButton type='default' className='pause_model' onClick={handleResume}>恢复</GButton>
          )
        } else {
          return (
            <GButton type='default' className='pause_model' onClick={handlePause}>暂停</GButton>
          )
        }
      }
      return null
    }
    return (
      <div className='footer_btn_wrap'>
        {
          isTrainsiton ? null : (
            <GButton
              type='default' className='delete_model'
              onClick={() => {
                isIter ? handleCancel() : handleDelete()
              }}
            >
              {isIter ? '取消训练' : '删除'}
            </GButton>
          )
        }
        {
          getPauseBtn()
        }
        <GButton type='primary' disabled={!isTrainsiton} onClick={goNext}>部署</GButton>
      </div>
    )
  }, [version?.iter?.status, handleDelete, activePipeLine, navigate, handleResume, handlePause, version, modelId])

  return (
    <div styleName='ModelDetail'>
      <div className='ModelDetail_wrap'>
        {views}
      </div>
      <FooterBar rightContent={rightContent} />
    </div>
  )
}

export default ModelDetail
