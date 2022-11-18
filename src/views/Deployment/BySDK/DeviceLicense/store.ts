import { atom } from 'jotai'
import { License } from '@src/shared/types/license'

export const idAtom = atom<string | undefined>(undefined)

export const versionIdAtom = atom<string | undefined>(undefined)

export const deviceLicenseListAtom = atom<Array<License>>([])