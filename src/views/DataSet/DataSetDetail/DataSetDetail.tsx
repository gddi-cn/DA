import { useMemo, useState, useCallback, useEffect } from 'react'
import { ScaleRight } from '@src/UIComponents'
import DatasetInfo from './DatasetInfo'
import DatasetPreview from './DatasetPreview'

import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'

import api from '@api'

// import { SNAPSHOT_KEY_OF_ROUTER } from '@src/constants'
// import { socketPushMsgForProject } from '@ghooks'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './DataSetDetail.module.less'

// const colors={

// }
//
const DataSetDetail = (): JSX.Element => {
  // 现在是哪个数据集
  const [whichSet, setWhichSet] = useState<'train_set' |'val_set'>('train_set')
  // 标签信息
  const [classInfo, setClassInfo] = useState<any>({})
  // 获取数据集概括信息
  const [datasetInfo, setDatasetInfo] = useState<Data>({} as Data)

  // const [trainSetData, setTrainSetData] = useState<any>({})
  // const [validSetData, setValidSetData] = useState<any>({})

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  // 数据集的信息
  const initFetchDatasetInfo = useCallback(
    async () => {
      try {
        const { APP_DATASET_DETAIL } = activePipeLine
        console.log(APP_DATASET_DETAIL, 'APP_DATASET_DETAIL')
        if (APP_DATASET_DETAIL?.id) {
          const res = await api.get(`/v3/datasets/${APP_DATASET_DETAIL?.id}`)
          if (res.code === 0) {
            setDatasetInfo(res.data || {})
            // setTrainSetData(res.data?.train_set || {})
            // setValidSetData(res.data?.val_set || {})
          }
        }
      } catch (e) {

      }
    }, [activePipeLine]
  )

  useEffect(() => {
    initFetchDatasetInfo()
  }, [initFetchDatasetInfo])

  /**
   * 测试、训练数据
   */

  const currentSet = useMemo(() => {
    try {
      return datasetInfo[whichSet] || {}
    } catch {
      return {}
    }
  }, [datasetInfo, whichSet])

  const leftContent = useMemo(() => {
    return (
      <div className='leftContent'>

        <DatasetInfo
          whichSet={whichSet}
          setClassInfo={setClassInfo}
          classInfo={classInfo}
          datasetInfo={datasetInfo}
          initFetchDatasetInfo={initFetchDatasetInfo}
          // version={version}
          // setVersion={setVersion}
          currentSet={currentSet}
        />
      </div>
    )
  }, [whichSet, classInfo, datasetInfo, initFetchDatasetInfo, currentSet])

  const currentId = useMemo(() => {
    return datasetInfo[whichSet]?.id
  }, [whichSet, datasetInfo])

  const rightContent = useMemo(() => {
    return (
      <div className='rightContent'>
        <DatasetPreview setWhichSet={setWhichSet} classInfo={classInfo} datasetInfo={datasetInfo} currentId={currentId} />
      </div>
    )
  }, [classInfo, datasetInfo, currentId])
  return (
    <div styleName='DataSetDetail'>
      <div className='ScaleRight_wrap'>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </div>
    </div>
  )
}

export default DataSetDetail
