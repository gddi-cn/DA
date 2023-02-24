import { useAtom } from 'jotai'
import React from 'react'

import { classListAtom, showClassListAtom } from './store'
import datasetAPI from '@src/apis/dataset'
import { currentClassAtom, currentDatasetAtom, currentSubDatasetAtom } from '../../store'
import produce from 'immer'

const useResetStore = () => {
  const [, setClassList] = useAtom(classListAtom)

  React.useEffect(
    () => () => {
      setClassList([])
    },
    []
  )
}

const useRefreshClassList = () => {
  const [, setClassList] = useAtom(classListAtom)
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)
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
      let idx = 0

      const helper = () => {
        if (idx >= classList.length) {
          return
        }

        if (idx === 0) {
          setCurrentClass(classList[0])
        }

        setShowClassList(produce(draft => {
          draft.push(...classList.splice(idx, 5))
        }))
        idx += 5

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
