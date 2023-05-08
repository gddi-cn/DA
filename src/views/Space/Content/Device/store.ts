import { atom, useSetAtom } from 'jotai'
import { DeviceRegisterResult, GroupDevice } from '@src/shared/types/device'
import { DeviceType } from '@src/shared/enum/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { RemoteSearchRef } from '@src/components/RemoteSearch/RemoteSearch'
import React from 'react'

export const deviceCurrentTabAtom = atom<DeviceType.TERMINAL | DeviceType.EDGE>(DeviceType.EDGE)

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

export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

export const sortByAtom = atom<'name' | 'registered_time'>('registered_time')

export const sortAtom = atom<'asc' | 'desc'>('desc')

// edge
export const edgeGroupRemoteSearchRefAtom
  = atom<React.RefObject<RemoteSearchRef> | undefined>(undefined)

// terminal
export const terminalGroupRemoteSearchRefAtom =
  atom<React.RefObject<RemoteSearchRef> | undefined>(undefined)

export const useResetStore = () => {
  const setTab = useSetAtom(deviceCurrentTabAtom)
  const setEdgeDeviceGroup = useSetAtom(selectedEdgeGroupAtom)
  const setDeviceGroupId = useSetAtom(selectedTerminalGroupAtom)
  const setTList = useSetAtom(terminalDeviceListAtom)
  const setTName = useSetAtom(terminalNameAtom)
  const setTPage = useSetAtom(terminalPageAtom)
  const setTPageSize = useSetAtom(terminalPageSizeAtom)
  const setTTotal = useSetAtom(terminalTotalAtom)
  const setTLoading = useSetAtom(fetchingTerminalAtom)
  const setEList = useSetAtom(edgeDeviceListAtom)
  const setEName = useSetAtom(edgeNameAtom)
  const setEPage = useSetAtom(edgePageAtom)
  const setEPageSize = useSetAtom(edgePageSizeAtom)
  const setETotal = useSetAtom(edgeTotalAtom)
  const setELoading = useSetAtom(fetchingEdgeAtom)
  const setSelectedTDevice = useSetAtom(selectedTerminalDeviceIdListAtom)
  const setSelectedEDevice = useSetAtom(selectedEdgeDeviceIdListAtom)
  const setDeviceTypeList = useSetAtom(deviceTypeListAtom)
  const setSortBy = useSetAtom(sortByAtom)
  const setSort = useSetAtom(sortAtom)

  React.useEffect(
    () => () => {
      setTLoading(true)
      setELoading(true)
      setTab(DeviceType.EDGE)
      setDeviceGroupId(null)
      setEdgeDeviceGroup(null)
      setTList([])
      setTName('')
      setTPage(1)
      setTPageSize(10)
      setTTotal(0)
      setEList([])
      setEName('')
      setEPage(1)
      setEPageSize(10)
      setETotal(0)
      setSelectedTDevice([])
      setSelectedEDevice([])
      setDeviceTypeList([])
      setSortBy('registered_time')
      setSort('desc')
      setELoading(false)
      setTLoading(false)
    },
    []
  )
}
