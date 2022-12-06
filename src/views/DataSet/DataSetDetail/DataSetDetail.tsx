import { useMemo, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import styled from 'styled-components'

import { ScaleRight } from '@src/UIComponents'
import DatasetInfo from './DatasetInfo'
import DatasetPreview from './DatasetPreview'
import Footer from './Footer'
import type { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import api from '@api'
import { useAtom } from 'jotai'
import { currentDatasetAtom } from '@views/DataSet/DataSetDetail/store'


const Container = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`

const Content = styled.div`
  flex: 1;
  max-width: 1920px;
  padding: 10px 30px;
`

const Item = styled.div`
  width: 100%;
  height: 100%;
`

const DataSetDetail = (): JSX.Element => {
  // 现在是哪个数据集
  const [whichSet, setWhichSet] = useState<'train_set' |'val_set'>('train_set')
  // 标签信息
  const [classInfo, setClassInfo] = useState<any>({})
  // 获取数据集概括信息
  const [datasetInfo, setDatasetInfo] = useAtom(currentDatasetAtom)

  const activePipeLine = useSelector((state: RootState) => {
    return state.tasksSilce.activePipeLine || {}
  })
  // 数据集的信息
  const initFetchDatasetInfo = useCallback(
    async () => {
      try {
        const { APP_DATASET_DETAIL } = activePipeLine
        if (APP_DATASET_DETAIL?.id) {
          const res = await api.get(`/v3/datasets/${APP_DATASET_DETAIL?.id}`)
          if (res.code === 0) {
            setDatasetInfo(res.data || null)
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
      return datasetInfo ? (datasetInfo[whichSet] || {}) : {}
    } catch {
      return {}
    }
  }, [datasetInfo, whichSet])

  const leftContent = useMemo(() => {
    return (
      <Item>
        <DatasetInfo
          whichSet={whichSet}
          setClassInfo={setClassInfo}
          classInfo={classInfo}
          datasetInfo={datasetInfo}
          initFetchDatasetInfo={initFetchDatasetInfo}
          currentSet={currentSet}
        />
      </Item>
    )
  }, [whichSet, classInfo, datasetInfo, initFetchDatasetInfo, currentSet])

  const currentId = useMemo(() => {
    return datasetInfo ? datasetInfo[whichSet]?.id : undefined
  }, [whichSet, datasetInfo])

  const rightContent = useMemo(() => {
    return (
      <Item>
        <DatasetPreview setWhichSet={setWhichSet} classInfo={classInfo} datasetInfo={datasetInfo} currentId={currentId} />
      </Item>
    )
  }, [classInfo, datasetInfo, currentId])
  return (
    <Container>
      <Content>
        <ScaleRight leftContent={leftContent} rightContent={rightContent} />
      </Content>
      <Footer />
    </Container>
  )
}

export default DataSetDetail
