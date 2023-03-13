import { useAtom } from 'jotai'
import React from 'react'

import { classListAtom, showClassListAtom } from './store'
import datasetAPI from '@src/apis/dataset'
import { currentClassAtom, currentDatasetAtom, currentSubDatasetAtom, datasetTypeAtom } from '../../store'
import produce from 'immer'

// 如果设置过小且标签数过大可能会超出最大迭代数，会导致各种奇怪的 bug
const step = 10

const useResetStore = () => {
  const [, setClassList] = useAtom(classListAtom)
  const [, setShowClassList] = useAtom(showClassListAtom)

  React.useEffect(
    () => () => {
      setClassList([])
      setShowClassList([])
    },
    []
  )
}

const useRefreshClassList = () => {
  const [, setClassList] = useAtom(classListAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const datasetId = datasetInfo?.id
  const subDatasetId = currentSubDataset?.id

  return async () => {
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

const useSmoothPushClassList = () => {
  const [classList] = useAtom(classListAtom)
  const [, setShowClassList] = useAtom(showClassListAtom)
  const [, setCurrentClass] = useAtom(currentClassAtom)

  React.useEffect(
    () => {
      setShowClassList([])
      const total = classList.length
      let idx = 0

      const helper = () => {
        if (idx >= total) {
          return
        }

        if (idx === 0) {
          setCurrentClass(classList[0])
        }

        setShowClassList(produce(draft => {
          draft.push(...classList.slice(idx, idx + step))
        }))
        idx += step

        requestAnimationFrame(helper)
      }

      requestAnimationFrame(helper)
    },
    [classList]
  )
}

export const useBaseInfo = () => {
  useResetStore()
  useSmoothPushClassList()

  const [datasetInfo] = useAtom(currentDatasetAtom)
  const datasetId = datasetInfo?.id
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const [datasetType] = useAtom(datasetTypeAtom)

  const refreshClasses = useRefreshClassList()

  React.useEffect(
    () => {
      refreshClasses()
    },
    [datasetId, datasetType]
  )

  return {
    datasetInfo,
    currentSubDataset,
  }
}
