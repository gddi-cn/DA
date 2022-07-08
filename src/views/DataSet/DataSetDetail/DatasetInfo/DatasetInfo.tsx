import DatasetInfoHeader from './DatasetInfoHeader'
import { useMemo } from 'react'

import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import BaseInfo from './BaseInfo'

import type { Dispatch, SetStateAction } from 'react'
import './DatasetInfo.module.less'

type Props = {
    whichSet: string,
    setClassInfo: Dispatch<SetStateAction<string>>,
    classInfo:any,
    datasetInfo: Data,
    initFetchDatasetInfo: () => Promise<void>,
    version:any,
    setVersion: Dispatch<SetStateAction<string>>,
    currentSet:any,

}

const DatasetInfo = (props: Props): JSX.Element => {
  const { whichSet, setClassInfo, classInfo, datasetInfo, initFetchDatasetInfo, version, setVersion, currentSet } = props

  //   const [version, setVersion] = useState<any>({})

  //   const [trainSetData, setTrainSetData] = useState<any>({})
  //   const [validSetData, setValidSetData] = useState<any>({})

  //   /**
  //      * 测试、训练数据
  //      */

  //   const fetAllSet = useCallback(async () => {
  //     console.log(1)
  //     try {
  //       if (!isEmpty(version)) {
  //         const trainRes = await api.get(`/v2/sub-datasets/${version.trainset_id}`)
  //         const validRes = await api.get(`/v2/sub-datasets/${version.validset_id}`)

  //         if (trainRes.code === 0) {
  //           setTrainSetData(trainRes.data || {})
  //         }

  //         if (validRes.code === 0) {
  //           setValidSetData(validRes.data || {})
  //         }
  //       }
  //     } catch (e) {

  //     }
  //   }, [version])

  //   useEffect(() => {
  //     fetAllSet()
  //   }, [fetAllSet])

  return (
    <div styleName='DatasetInfo'>
      {
        useMemo(() => (
          <DatasetInfoHeader datasetInfo={datasetInfo} initFetchDatasetInfo={initFetchDatasetInfo} setVersion={setVersion} />
        ), [datasetInfo, initFetchDatasetInfo, setVersion])
      }
      {
        useMemo(() => (
          <BaseInfo
            version={version}
            currentSet={currentSet}
            datasetInfo={datasetInfo}
            whichSet={whichSet}
            setClassInfo={setClassInfo}
            classInfo={classInfo}
          />
        ), [classInfo, setClassInfo, currentSet, version, whichSet, datasetInfo])
      }
    </div>
  )
}

export default DatasetInfo
