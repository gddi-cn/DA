import { lazy, useCallback, useEffect, useMemo } from 'react'
import { FooterBar, GButton } from '@src/UIComponents'
import { SuspenseForFC } from '@router/utils'
import api from '@api'
// import ModelDetailType from './types';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import { message, Skeleton } from 'antd';
import { isEmpty } from 'lodash';
import { setCurrentVersion, setVersionList, setVersionInfo, setModelId } from '@reducer/modelDetailSlice'

import { useNavigate } from 'react-router-dom'
import { APP_SELECT_DEPLOY_TYPE } from '@router'
import { socketPushMsgForProject } from '@ghooks'
import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
import './ModelDetail.module.less'

// ?id=370695350071697408&cuurentVersionId=370695350075891712&

const TrainSuccess = lazy(() => import('@src/views/Model/ModelDetail/TrainSuccess'));
const TrainingOrFailed = lazy(() => import('@src/views/Model/ModelDetail/TrainingOrFailed'));

const ModelDetail = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const model_id = useSelector((state: RootState) => {
    // return '342463664469155840'
    if (state.tasksSilce.activePipeLine) {
      return state.tasksSilce.activePipeLine.APP_MODEL_TRAIN_DETAIL?.id
    }
    return ''
  })

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })

  const model_version_id = useSelector((state: RootState) => {
    // return '342463664469155840'
    if (state.tasksSilce.activePipeLine) {
      return state.tasksSilce.activePipeLine.APP_MODEL_TRAIN_DETAIL?.version_id
    }
    return ''
  })
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const currentVersion = useSelector((state: RootState) => {
    return state.modelDetailSlice.currentVersion
  })
  //   const [versionList, setVersionList] = useState<ModelDetailType.VersionItem[] >([])

  //   const [currentVersion, setCurrentVersion] = useState<ModelDetailType.VersionItem >()

  //   const [versionInfo, setVersionInfo] = useState<ModelDetailType.VersionInfo>()
  console.log(model_id, 'model_id')
  const getModelBaseInfo = useCallback(
    async () => {
      try {
        if (!model_id) {
          return
        }
        // 后端神奇的默认
        if ((model_id as any) === '0') {
          return
        }

        dispatch(setModelId(model_id))
        const path = `/v2/models/${model_id}/versions`
        const res = await api.get(path)
        if (res.code === 0) {
          const { versions } = res.data
          // 默认
          // 如果还没选择过版本,就默认第一个,选择过了就都是选择后的
          if (versions) {
            let _currentVersion = versions[0]

            if (model_version_id) {
              const existCurrentVersion = versions.find((o: any) => o.id === model_version_id)
              if (existCurrentVersion) {
                _currentVersion = existCurrentVersion
              }
            }

            dispatch(setVersionList(versions))
            dispatch(setCurrentVersion(_currentVersion))
          }
        } else {
          message.error(res.message)
        }
        console.log(1)
      } catch (e) {

      }
    }, [dispatch, model_id, model_version_id]
  )

  useEffect(() => {
    getModelBaseInfo()
  }, [getModelBaseInfo])

  const initVersionData = useCallback(
    async () => {
      try {
        if (!currentVersion?.id) {
          return
        }
        const iterInfoRes = await api.get(`/v2/models/${model_id}/versions/${currentVersion?.id}`)
        if (iterInfoRes.code === 0) {
          const iterInfo = iterInfoRes.data
          dispatch(setVersionInfo(iterInfo))
        }
      } catch (e) {
        console.error(e)
      }
    }, [
      currentVersion?.id, dispatch, model_id
    ]
  )
  useEffect(() => {
    initVersionData()
  }, [initVersionData])

  const views = useMemo(() => {
    if (isEmpty(versionInfo) || !model_id) {
      return <Skeleton active />
    }
    const isTrainsiton = [2].includes(+(versionInfo?.iter.status))
    const key = isTrainsiton ? 'sucess' : 'other'
    const view_object = {
      sucess: SuspenseForFC(
        <TrainSuccess />
      ),
      other: SuspenseForFC(
        <TrainingOrFailed />
      )
    }
    return view_object[key] || null
  }, [versionInfo, model_id])

  const rightContent = useMemo(() => {
    const goNext = async () => {
      socketPushMsgForProject(
        activePipeLine, {
          active_page: SNAPSHOT_KEY_OF_ROUTER.APP_SELECT_DEPLOY_TYPE
        }
      )
      navigate({
        pathname: APP_SELECT_DEPLOY_TYPE
      })
    }

    const isTrainsiton = [2].includes(+(versionInfo?.iter?.status))
    // const can_click = isTrainsiton ? 'yes_sir' : 'not_allow'
    return (
      <div className='footer_btn_wrap'>

        <GButton type='primary' disabled={!isTrainsiton} onClick={goNext}>部署</GButton>
      </div>
    )
  }, [activePipeLine, navigate, versionInfo?.iter?.status])

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
