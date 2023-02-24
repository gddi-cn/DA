import { DatasetClass } from '@src/shared/types/dataset'
import { atom } from 'jotai'

export const classListAtom = atom<Array<DatasetClass>>([])
export const showClassListAtom = atom<Array<DatasetClass>>([])
