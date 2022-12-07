import { atom } from 'jotai'
import { ModelFalseAnalysis, ModelFalseAnalysisItem, SegmentFalseAnalysis } from '@src/shared/types/model'
import { DatasetScene } from '@src/shared/enum/dataset'
import { ModelFalseType } from '@src/shared/enum/model'
import { formatFalseAnalysis } from './utils'

export const modelTypeAtom = atom<DatasetScene | null>(null)

export const falseAnalysisAtom = atom<ModelFalseAnalysis | null>(null)

export const falseTypeAtom = atom<ModelFalseType>(ModelFalseType.SCENE)

export const falseListAtom = atom<Array<ModelFalseAnalysisItem>>(get => {
  const scene = get(modelTypeAtom)
  const falseType = get(falseTypeAtom)
  const falseAnalysis = get(falseAnalysisAtom)

  if (!falseAnalysis || !scene) return [] as Array<ModelFalseAnalysisItem>

  return formatFalseAnalysis(scene, falseAnalysis, falseType)
})

export const selectedItemKeyAtom = atom<string | null>(null)

export const selectedItemAtom = atom<ModelFalseAnalysisItem | null>(get => {
  const selectedKey = get(selectedItemKeyAtom)
  const falseList = get(falseListAtom)
  const [target] = falseList.filter(x => x.uid === selectedKey)
  return target || null
})

export const displayTypeAtom = atom<'grid' | 'slick'>('grid')
