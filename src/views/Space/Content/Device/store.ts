import { atom } from 'jotai'
import { DeviceRegisterResult, GroupDevice } from '@src/shared/types/device'
import { DeviceType } from '@src/shared/enum/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'

export const deviceCurrentTabAtom = atom<DeviceType.TERMINAL | DeviceType.EDGE>(DeviceType.TERMINAL)

export const selectedEdgeGroupAtom = atom<DeviceGroupOptions | null>(null)

export const selectedTerminalGroupAtom = atom<DeviceGroupOptions | null>(null)

export const terminalDeviceListAtom = atom<Array<GroupDevice>>([])

export const terminalNameAtom = atom<string>('')

export const terminalPageAtom = atom<number>(1)

export const terminalPageSizeAtom = atom<number>(10)

export const terminalTotalAtom = atom<number>(0)

export const fetchingTerminalAtom = atom<boolean>(false)

export const edgeDeviceListAtom = atom<Array<GroupDevice>>([])

export const edgeNameAtom = atom<string>('')

export const edgePageAtom = atom<number>(1)

export const edgePageSizeAtom = atom<number>(10)

export const edgeTotalAtom = atom<number>(0)

export const fetchingEdgeAtom = atom<boolean>(false)

export const selectedTerminalDeviceIdListAtom = atom<Array<GroupDevice['id']>>([])

export const selectedEdgeDeviceIdListAtom = atom<Array<GroupDevice['id']>>([])

export const stepAtom = atom<'device' | 'reg_res'>('device')

export const registerResultAtom = atom<Array<DeviceRegisterResult>>([])
