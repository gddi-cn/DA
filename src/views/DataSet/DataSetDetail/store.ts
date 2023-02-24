import { Dataset, DatasetClass, SubDataset } from '@src/shared/types/dataset'
import { atom } from 'jotai'

// 点连线顺序 [开始下标，结束下标]
export const keypointOrderAtom = atom<Array<[number, number]>>((get) => {
  const { keypoint, skeleton } = get(currentDatasetAtom)?.meta || {}
  if (!keypoint || !skeleton) return []

  const order: Array<[number, number]> = []

  skeleton.forEach(({ start, end }) => {
    const s_idx = keypoint.findIndex(x => x.name === start)
    const e_idx = keypoint.findIndex(x => x.name === end)
    if (s_idx < 0 || e_idx < 0) return

    order.push([s_idx, e_idx])
  })

  return order
})

export const currentDatasetAtom = atom<Dataset | null>(null)
export const currentClassAtom = atom<DatasetClass | null>(null)
export const datasetTypeAtom = atom<'train_set' | 'val_set'>('train_set')
export const fetchingDatasetAtom = atom<boolean>(false)

// currentSet
export const currentSubDatasetAtom = atom<SubDataset | null>((get) => {
  const datasetInfo = get(currentDatasetAtom)
  if (!datasetInfo) return null

  const datasetType = get(datasetTypeAtom)
  
  return datasetInfo[datasetType] || null
})

