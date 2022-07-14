import { lazy, useCallback, useEffect, useMemo } from 'react'
import { SuspenseForFC } from '@router/utils'
import api from '@api'
// import ModelDetailType from './types';
import { RootState } from '@reducer/index'
import { message, Skeleton } from 'antd';
import { isEmpty } from 'lodash';
import { setCurrentVersion, setVersionList, setVersionInfo, setModelId } from '@reducer/modelDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import './ModelDetail.module.less'

// ?id=370695350071697408&cuurentVersionId=370695350075891712&

const TrainSuccess = lazy(() => import('@src/views/Model/ModelDetail/TrainSuccess'));
const TrainingOrFailed = lazy(() => import('@src/views/Model/ModelDetail/TrainingOrFailed'));

const id = '354060292334395392'
const ModelDetail = (): JSX.Element => {
  const dispatch = useDispatch()

  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })
  //   const [versionList, setVersionList] = useState<ModelDetailType.VersionItem[] >([])

  //   const [currentVersion, setCurrentVersion] = useState<ModelDetailType.VersionItem >()

  //   const [versionInfo, setVersionInfo] = useState<ModelDetailType.VersionInfo>()

  const getModelBaseInfo = useCallback(
    async () => {
      try {
        dispatch(setModelId(id))
        const path = `/v2/models/${id}/versions`
        const res = await api.get(path)
        if (res.code === 0) {
          const { versions } = res.data
          console.log(versions)
          if (versions) {
            const _currentVersion = versions[0]

            const { id: current_version_id } = _currentVersion

            const iterInfoRes = await api.get(`/v2/models/${id}/versions/${current_version_id}`)
            if (res.code === 0) {
              const iterInfo = iterInfoRes.data
              dispatch(setVersionInfo(iterInfo))
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
    }, [dispatch]
  )

  //   useEffect(() => {
  //     console.log(versionList)
  //   }, [versionList])

  useEffect(() => {
    getModelBaseInfo()
  }, [getModelBaseInfo])

  const views = useMemo(() => {
    if (isEmpty(versionInfo)) {
      return <Skeleton active />
    }
    const isTrainsiton = [2].includes(+(versionInfo?.iter.status))
    const key = isTrainsiton ? 'sucess' : 'other'
    const view_object = {
      sucess: SuspenseForFC(
        <TrainSuccess />
      ),
      other: SuspenseForFC(
        <TrainingOrFailed id={id} />
      )
    }
    return view_object[key] || null
  }, [versionInfo])

  return (
    <div styleName='ModelDetail'>
      <div className='ModelDetail_wrap'>
        {views}
      </div>

    </div>
  )
}

export default ModelDetail