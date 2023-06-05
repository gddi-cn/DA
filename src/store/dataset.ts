import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { atom } from 'jotai'

export const templateDatasetAtom = atom<Data | null>(null)
export const currentDatasetAtom= atom<Data | undefined>(undefined)
export const currentDatasetIdAtom = atom<Data['id'] | undefined>(undefined)
export const currentModelIdAtom = atom<string | undefined>(undefined)
export const currentModelVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)
