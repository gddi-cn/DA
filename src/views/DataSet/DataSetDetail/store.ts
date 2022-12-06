import { Data } from '@views/DataSet/DataSetIndex/V1DatasetCard/V1DatasetCard'
import { atom } from 'jotai'

export const currentDatasetAtom = atom<Data | null>(null)
