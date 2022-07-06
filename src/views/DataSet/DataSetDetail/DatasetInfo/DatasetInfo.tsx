import DatasetInfoHeader from './DatasetInfoHeader'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '@api'
import Qs from 'qs'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import BaseInfo from './BaseInfo'
import './DatasetInfo.module.less'

const DatasetInfo = (): JSX.Element => {
  const location = useLocation()
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)
  const { search } = location
  const { id } = Qs.parse(search.substring(1))

  const [version, setVersion] = useState<any>({})

  const initFetchDatasetInfo = useCallback(
    async () => {
      try {
        const res = await api.get(`/v2/datasets/${id}`)
        if (res.code === 0) {
          setDatasetInfo(res.data || {})
        }
      } catch (e) {

      }
    }, [id]
  )

  useEffect(() => {
    initFetchDatasetInfo()
  }, [initFetchDatasetInfo])

  return (
    <div styleName='DatasetInfo'>

      <DatasetInfoHeader datasetInfo={datasetInfo} initFetchDatasetInfo={initFetchDatasetInfo} setVersion={setVersion} />
      <BaseInfo version={version} />
    </div>
  )
}

export default DatasetInfo
