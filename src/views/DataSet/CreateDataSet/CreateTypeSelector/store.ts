import { atom } from 'jotai'

import { DatasetCreateType } from '@src/shared/enum/dataset'

export const selectedTypeAtom = atom<DatasetCreateType | null>(null)
