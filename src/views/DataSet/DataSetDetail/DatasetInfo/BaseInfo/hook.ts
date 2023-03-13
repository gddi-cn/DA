import { useAtom } from 'jotai'
import React from 'react'

import { classListAtom, showClassListAtom } from './store'
import datasetAPI from '@src/apis/dataset'
import { currentClassAtom, currentDatasetAtom, currentSubDatasetAtom, datasetTypeAtom } from '../../store'
import produce from 'immer'
import { templateDatasetAtom } from '@src/store/dataset'

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
  const [currentSubDataset] = useAtom(templateDatasetAtom)
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
  // useResetStore()
  // useSmoothPushClassList()
  const [datasetInfo] = useAtom(templateDatasetAtom)
  const datasetId = datasetInfo?.id
  const [currentSubDataset] = useAtom(currentSubDatasetAtom)
  const [datasetType] = useAtom(datasetTypeAtom)

  const refreshClasses = useRefreshClassList()

  React.useEffect(
    () => {
      console.log({ datasetId })
      // refreshClasses()
    },
    [datasetId]
  )


  React.useEffect(
    () => {
      return () => {
        console.log('__')
      }
    },
    []
  )
  return {
    datasetInfo,
    currentSubDataset,
  }
}
