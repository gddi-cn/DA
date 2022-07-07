import DatasetInfoHeader from './DatasetInfoHeader'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '@api'
import Qs from 'qs'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import BaseInfo from './BaseInfo'
import { isEmpty } from 'lodash'
import type { Dispatch, SetStateAction } from 'react'
import './DatasetInfo.module.less'

type Props = {
    whichSet: string,
    setClassInfo: Dispatch<SetStateAction<string>>,
    classInfo:any
}

const DatasetInfo = (props: Props): JSX.Element => {
  const { whichSet, setClassInfo, classInfo } = props
  const location = useLocation()
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)
  const { search } = location
  const { id } = Qs.parse(search.substring(1))

  const [version, setVersion] = useState<any>({})

  const [trainSetData, setTrainSetData] = useState<any>({})
  const [validSetData, setValidSetData] = useState<any>({})

  // 数据集的信息
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

  /**
     * 测试、训练数据
     */

  const fetAllSet = useCallback(async () => {
    console.log(1)
    try {
      if (!isEmpty(version)) {
        const trainRes = await api.get(`/v2/sub-datasets/${version.trainset_id}`)
        const validRes = await api.get(`/v2/sub-datasets/${version.validset_id}`)

        if (trainRes.code === 0) {
          setTrainSetData(trainRes.data || {})
        }

        if (validRes.code === 0) {
          setValidSetData(validRes.data || {})
        }
      }
    } catch (e) {

    }
  }, [version])
  useEffect(() => {
    fetAllSet()
  }, [fetAllSet])

  return (
    <div styleName='DatasetInfo'>
      {
        useMemo(() => (
          <DatasetInfoHeader datasetInfo={datasetInfo} initFetchDatasetInfo={initFetchDatasetInfo} setVersion={setVersion} />
        ), [datasetInfo, initFetchDatasetInfo])
      }
      {
        useMemo(() => (
          <BaseInfo
            version={version}
            trainSetData={trainSetData}
            validSetData={validSetData}
            whichSet={whichSet}
            setClassInfo={setClassInfo}
            classInfo={classInfo}
          />
        ), [classInfo, setClassInfo, trainSetData, validSetData, version, whichSet])
      }
    </div>
  )
}

export default DatasetInfo
