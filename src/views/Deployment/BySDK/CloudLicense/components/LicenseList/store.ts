import { atom } from 'jotai'
import { License } from '@src/shared/types/license'

export const cloudLicenseListAtom = atom<Array<License>>([])