import { useSelector } from 'react-redux'
import React from 'react'
import { useAtom } from 'jotai'

import {
  modelTypeAtom,
  falseAnalysisAtom,
  selectedItemKeyAtom,
  falseTypeAtom,
  falseListAtom, displayTypeAtom
} from './store'
import { DatasetScene } from '@src/shared/enum/dataset'
import modelAPI from '@src/apis/model'
export const useErrorAnalysis = () => {
  const [, setType] = useAtom(modelTypeAtom)
  const [, setFalseAnalysis] = useAtom(falseAnalysisAtom)
  const [, setSelectedItemKey] = useAtom(selectedItemKeyAtom)
  const [, setDisplayType] = useAtom(displayTypeAtom)
  const [falseType] = useAtom(falseTypeAtom)
  const [falseList] = useAtom(falseListAtom)

  const { id, iter, model_type } = useSelector((state: any) => state.modelDetailSlice?.versionInfo || {})

  // get and set model type from global store
  React.useEffect(
    () => {
      setType(model_type ? model_type as DatasetScene : null)
    },
    [model_type]
  )

  // Fetch error analysis
  React.useEffect(
    () => {
      if (!id || !iter?.id) return setFalseAnalysis(null)

      modelAPI
        .errorAnalysis(id, iter.id)
        .then(({ success, data }) => {
          if (!success || !data) return setFalseAnalysis(null)
          setFalseAnalysis(data)
        })
    },
    [id, iter]
  )

  React.useEffect(
    () => {
      setSelectedItemKey(falseList[0]?.uid || null)
    },
    [falseType, falseList]
  )

  // Reset the store before component unmount.
  React.useEffect(
    () => {
      return () => {
        setType(null)
        setFalseAnalysis(null)
        setSelectedItemKey(null)
        setDisplayType('grid')
      }
    },
    []
  )

  return {
    empty: !falseList?.length
  }
}
