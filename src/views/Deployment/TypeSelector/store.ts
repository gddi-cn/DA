import { atom } from 'jotai'

import { DeployType } from '@src/shared/enum/deploy'

export const selectedTypeAtom = atom<DeployType | null>(null)
