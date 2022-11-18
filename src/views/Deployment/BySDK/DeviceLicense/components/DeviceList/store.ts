import { atom } from 'jotai'
import { LicensedDevice } from '@src/shared/types/device'

export const PAGE_SIZE = 7

export const devicesAtom = atom([] as LicensedDevice[])

export const deviceDialogOpenAtom = atom(false)

export const deviceListPageAtom = atom(1)

export const deviceTotalAtom = atom(0)