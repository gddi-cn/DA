import { useAtom } from 'jotai'
import React from 'react'

import { classListAtom, classPageAtom, classPageSizeAtom, hasMoreAtom, showClassListAtom } from './store'
import datasetAPI from '@src/apis/dataset'
import { currentDatasetAtom, currentSubDatasetAtom } from '../../store'

const useResetStore = () => {
  const [, setClassList] = useAtom(classListAtom)
  const [, setPage] = useAtom(classPageAtom)
  const [, setPageSize] = useAtom(classPageSizeAtom)

  React.useEffect(
    () => () => {
      setClassList([])
      setPage(0)
      setPageSize(20)
    },
    []
  )
}

const useRefreshClassList = () => {
  const [, setClassList] = useAtom(classListAtom)
  const [, setPage] = useAtom(classPageAtom)
  const [, setPageSize] = useAtom(classPageSizeAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const datasetId = datasetInfo?.id
  const subDatasetId = currentSubDataset?.id

  return async () => {
    setPage(0)
    setPageSize(20)
    setClassList([])
    if (!datasetId || !subDatasetId) {
      return
    }

    const { success, data } = await datasetAPI.classes(datasetId, subDatasetId)
    if (!success || !data) {
      return
    }

    setClassList(data)
  }
}

export const useBaseInfo = () => {
  useResetStore()
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const datasetId = datasetInfo?.id
  const subDatasetId = currentSubDataset?.id

  const refreshClasses = useRefreshClassList()

  React.useEffect(
    () => {
      refreshClasses()
    },
    [datasetId, subDatasetId]
  )

}
