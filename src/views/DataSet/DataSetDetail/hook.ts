import React from 'react'
import { useAtom } from 'jotai'
import _ from 'lodash'

import {
  currentClassAtom,
  currentDatasetAtom,
  datasetTypeAtom,
  fetchingDatasetAtom
} from './store'
import { currentDatasetIdAtom, templateDatasetAtom } from '@src/store/dataset'
import datasetAPI from '@src/apis/dataset'
import { Dataset } from '@src/shared/types/dataset'
import { classListAtom } from './DatasetInfo/BaseInfo/store'

const useResetStore = () => {
  const [, setCurrentClass] = useAtom(currentClassAtom)
  const [, setDatasetType] = useAtom(datasetTypeAtom)
  const [, setCurrentDatasetInfo] = useAtom(currentDatasetAtom)
  const [, setLoading] = useAtom(fetchingDatasetAtom)
  const [, setClassList] = useAtom(classListAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setClassList([])
      setCurrentClass(null)
      setCurrentDatasetInfo(null)
      setDatasetType('train_set')
      setLoading(false)
    },
    []
  )
}

export const useRefreshDataset = () => {
  const [, setTemplateDataset] = useAtom(templateDatasetAtom)
  const [, setDataset] = useAtom(currentDatasetAtom)
  const [loading, setLoading] = useAtom(fetchingDatasetAtom)

  return async (datasetId: Dataset['id']) => {
    if (loading) return

    if (!datasetId) {
      setTemplateDataset(null)
      setDataset(null)
      return
    }

    setLoading(true)
    const { success, data } = await datasetAPI.detail(datasetId)
    setLoading(false)

    if (!success || !data) {
      setTemplateDataset(null)
      setDataset(null)
      return
    }

    setTemplateDataset(data)
    setDataset(data)
  }
}

export const useDatasetDetail = () => {
  useResetStore()

  const refresh = useRefreshDataset()

  const [datasetId] = useAtom(currentDatasetIdAtom)

  React.useEffect(
    () => {
      if (!datasetId) return
      refresh(datasetId)
    },
    [datasetId]
  )

}

