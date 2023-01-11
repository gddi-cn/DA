import { atom } from 'jotai'

import { Platform } from '@views/Platform/enum'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { GroupDevice } from '@src/shared/types/device'

export const modelVersionIdAtom = atom<string | undefined>(undefined)

export const currentStepAtom = atom<Platform.Step>(Platform.Step.SELECT_APP)
// export const currentStepAtom = atom<Platform.Step>(Platform.Step.CONFIG)

// app list filter params
export const selectDeviceTypeAtom = atom<Device.Chip.Instance | null>(null)

export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

export const fetchingAppListAtom = atom<boolean>(false)

export const appListAtom = atom<Array<App.Instance>>([])

export const createAppOpenAtom = atom<boolean>(false)

export const fetchingDeviceTypeListAtom = atom<boolean>(false)

export const selectedAppAtom = atom<App.Instance | undefined>(undefined)

export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const groupDeviceListAtom = atom<Array<GroupDevice>>([])

export const fetchingGroupDeviceAtom = atom<boolean>(false)

export const groupDeviceTotalAtom = atom<number>(0)

export const groupDevicePageAtom = atom<number>(1)

export const groupDevicePageSizeAtom = atom<number>(10)

export const selectedDeviceIdListAtom = atom<Array<GroupDevice['id']>>([])
