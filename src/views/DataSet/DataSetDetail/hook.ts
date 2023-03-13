import React from 'react'
import { useAtom } from 'jotai'

import {
  currentClassAtom,
  currentDatasetAtom,
  datasetTypeAtom,
  fetchingDatasetAtom
} from './store'
import { Dataset } from '@src/shared/types/dataset'
import { templateDatasetAtom } from '@src/store/dataset'
import datasetAPI from '@src/apis/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '@src/controller/reducer'

const useResetStore = () => {
  const [, setCurrentClass] = useAtom(currentClassAtom)
  const [, setDatasetType] = useAtom(datasetTypeAtom)
  const [, setCurrentDatasetInfo] = useAtom(currentDatasetAtom)
  const [, setLoading] = useAtom(fetchingDatasetAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setCurrentClass(null)
      setCurrentDatasetInfo(null)
      setDatasetType('train_set')
      setLoading(false)
    },
    []
  )
}

const useRefreshDataset = () => {
  const [, setTemplateDataset] = useAtom(templateDatasetAtom)
  const [, setDataset] = useAtom(currentDatasetAtom)
  const [loading, setLoading] = useAtom(fetchingDatasetAtom)

  return async (id?: Dataset['id']) => {
    if (loading) return

    if (!id) {
      setTemplateDataset(null)
      setDataset(null)
      return
    }

    setLoading(true)
    const { success, data } = await datasetAPI.detail(id)
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

  const datasetId = useSelector((state: RootState) =>
    state.tasksSilce.activePipeLine?.APP_DATASET_DETAIL?.id
  )

  React.useEffect(
    () => {
      if (!datasetId) return
      refresh(datasetId)
    },
    [datasetId]
  )
}

