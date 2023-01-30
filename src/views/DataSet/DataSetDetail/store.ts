import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { atom } from 'jotai'

export const currentDatasetAtom = atom<Data | null>(null)

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