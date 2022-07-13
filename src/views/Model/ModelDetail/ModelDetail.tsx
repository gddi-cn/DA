import { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { SuspenseForFC } from '@router/utils'
import api from '@api'
import './ModelDetail.module.less'
import ModelDetailType from './types';
import { message } from 'antd';
import { isNil } from 'lodash';

// ?id=370695350071697408&cuurentVersionId=370695350075891712&

const TrainSuccess = lazy(() => import('@src/views/Model/ModelDetail/TrainSuccess'));
const TrainingOrFailed = lazy(() => import('@src/views/Model/ModelDetail/TrainingOrFailed'));

const id = '370755354338369536'
const ModelDetail = (): JSX.Element => {
  const [versionList, setVersionList] = useState<ModelDetailType.VersionItem[] >([])

  const [currentVersion, setCurrentVersion] = useState<ModelDetailType.VersionItem >()

  const [versionInfo, setVersionInfo] = useState<ModelDetailType.VersionInfo>()

  const getModelBaseInfo = useCallback(
    async () => {
      try {
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
              setVersionInfo(iterInfo)
            }
            setVersionList(versions)
            setCurrentVersion(_currentVersion)
          }
        } else {
          message.error(res.message)
        }
        console.log(1)
      } catch (e) {

      }
    }, []
  )

  useEffect(() => {
    console.log(versionList)
  }, [versionList])

  useEffect(() => {
    getModelBaseInfo()
  }, [getModelBaseInfo])

  const views = useMemo(() => {
    if (isNil(versionInfo)) {
      return null
    }
    const isTrainsiton = [2].includes(+(versionInfo?.iter.status))
    const key = isTrainsiton ? 'sucess' : 'other'
    const view_object = {
      sucess: SuspenseForFC(
        <TrainSuccess versionInfo={versionInfo} id={id} />
      ),
      other: SuspenseForFC(
        <TrainingOrFailed currentVersion={currentVersion} id={id} versionInfo={versionInfo}/>
      )
    }
    return view_object[key] || null
  }, [currentVersion, versionInfo])

  return (
    <div styleName='ModelDetail'>
      <div className='ModelDetail_wrap'>
        {views}
      </div>

    </div>
  )
}

export default ModelDetail
