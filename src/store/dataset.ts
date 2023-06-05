import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { atom } from 'jotai'
import datasetAPI from '@src/apis/dataset'

export const templateDatasetAtom = atom<Data | null>(null)
export const currentDatasetIdAtom = atom<Data['id'] | undefined>(undefined)
export const currentDatasetAtom= atom<Promise<Data | undefined>>(async (get) => {
  const id = get(currentDatasetIdAtom)
  if (!id) return undefined

  const { success, data } = await datasetAPI.detail(id)

  if (!success || !data) return undefined

  return data
})
export const currentModelIdAtom = atom<string | undefined>(undefined)
export const currentModelVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)
