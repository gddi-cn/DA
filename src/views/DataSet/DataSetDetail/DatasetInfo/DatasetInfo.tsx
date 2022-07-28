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
    // version:any,
    // setVersion: Dispatch<SetStateAction<string>>,
    currentSet:any,

}

const DatasetInfo = (props: Props): JSX.Element => {
  const { whichSet, setClassInfo, classInfo, datasetInfo, initFetchDatasetInfo, currentSet } = props

  return (
    <div styleName='DatasetInfo'>
      {
        useMemo(() => (
          <DatasetInfoHeader datasetInfo={datasetInfo} initFetchDatasetInfo={initFetchDatasetInfo} />
        ), [datasetInfo, initFetchDatasetInfo])
      }
      {
        useMemo(() => (
          <BaseInfo
            // version={version}
            currentSet={currentSet}
            datasetInfo={datasetInfo}
            whichSet={whichSet}
            setClassInfo={setClassInfo}
            classInfo={classInfo}
          />
        ), [classInfo, setClassInfo, currentSet, whichSet, datasetInfo])
      }
    </div>
  )
}

export default DatasetInfo
