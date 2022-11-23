import { atom } from 'jotai'
import { DeviceRegisterResult, GroupDevice } from '@src/shared/types/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { DeviceRegisterRes } from '@src/shared/enum/device'


export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const dialogOpenAtom = atom<boolean>(false)

export const groupDeviceAtom = atom<GroupDevice[]>([])
export const groupDeviceTotalAtom = atom<number>(0)
export const fetchingGroupDeviceAtom = atom<boolean>(false)
export const groupDevicePageAtom = atom<number>(1)
export const selectedDeviceAtom = atom<Array<GroupDevice['id']>>([])

export const stepAtom = atom<'register' | 'device' | 'date' | 'reg_res'>('device')

export const registerResultAtom = atom<Array<DeviceRegisterResult>>([])
