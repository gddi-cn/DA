import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { atom } from 'jotai'
import datasetAPI from '@src/apis/dataset'
import { atomWithRefresh } from '@src/utils/atomCreators'
import modelAPI from '@src/apis/model'

export const currentProjectIdAtom = atom<string | undefined>(undefined)

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

export const modelVersionListAtom = atomWithRefresh(async (get) => {
  const modelId = get(currentModelIdAtom)
  if (!modelId) return []

  const { success, data } = await modelAPI.versionList(modelId)

  if (!success || !data?.versions) return []

  return data.versions ?? []
})

export const currentModelVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)

export const modelVersionStatusAtom = atom(get => {
  const versionList = get(modelVersionListAtom)
  const currentVersionId = get(currentModelVersionIdAtom)

  const version = versionList.find(x => x.id === currentVersionId)

  return version?.status
})
