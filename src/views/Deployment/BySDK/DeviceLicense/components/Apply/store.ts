import { atom } from 'jotai'
import { DeviceGroup } from '@src/shared/types/deviceGroup'
import { LicensedDevice } from '@src/shared/types/device'

export const selectedDeviceGroupAtom = atom<{ key: string, id: string, label: string } | null>(null)

export const groupDeviceAtom = atom<LicensedDevice[]>([])