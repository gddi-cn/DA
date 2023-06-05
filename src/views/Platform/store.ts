import React from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'

import { Platform } from '@views/Platform/enum'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { GroupDevice } from '@src/shared/types/device'
import { useSelector } from 'react-redux'
import { RootState } from '@src/controller/reducer'
import { AppTemplateInput } from '@src/shared/enum/application'


export const currentStepAtom = atom<Platform.Step>(Platform.Step.SELECT_APP)
// export const currentStepAtom = atom<Platform.Step>(Platform.Step.SYNC)

// app list filter params
export const selectDeviceTypeAtom = atom<Device.Chip.Instance | null>(null)

export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

export const fetchingAppListAtom = atom<boolean>(false)

export const appListAtom = atom<Array<App.Instance>>([])

export const createAppOpenAtom = atom<boolean>(false)

export const fetchingDeviceTypeListAtom = atom<boolean>(false)

export const selectedAppAtom = atom<App.Instance | undefined>(undefined)

export const hideChannelAtom = atom<boolean>(get => {
  const selectedApp = get(selectedAppAtom)
  return selectedApp?.input === AppTemplateInput.IMAGE
})

export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const groupDeviceListAtom = atom<Array<GroupDevice>>([])

export const fetchingGroupDeviceAtom = atom<boolean>(false)

export const groupDeviceTotalAtom = atom<number>(0)

export const groupDevicePageAtom = atom<number>(1)

export const groupDevicePageSizeAtom = atom<number>(10)

export const selectedDeviceIdListAtom = atom<Array<GroupDevice['id']>>([])

export const expireAtom = atom<number>(-1)

export const limitAtom = atom<number>(1)

export const syncTypeAtom = atom<'export' | 'sync'>('sync')

export const maxLimitAtom = atom<number>(0)

export const deviceListSortAtom = atom<'asc' | 'desc'>('desc')

export const deviceListSortByAtom = atom<'name' | 'registered_time'>('registered_time')

export const useResetStore = () => {
  const currentTaskId = useSelector((state: RootState) => state.tasksSilce.activeTaskInfo?.id)

  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [, setSelectDeviceType] = useAtom(selectDeviceTypeAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setFetchingAppList] = useAtom(fetchingAppListAtom)
  const [, setAppList] = useAtom(appListAtom)
  const [, setCreateAppOpen] = useAtom(createAppOpenAtom)
  const [, setFetchingDeviceTypeList] = useAtom(fetchingDeviceTypeListAtom)
  const [, setSelectedApp] = useAtom(selectedAppAtom)
  const [, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)
  const [, setExpire] = useAtom(expireAtom)
  const [, setLimit] = useAtom(limitAtom)
  const [, setSyncType] = useAtom(syncTypeAtom)
  const [, setSelectedDeviceList] = useAtom(selectedDeviceIdListAtom)
  const setMaxLimit = useSetAtom(maxLimitAtom)
  const setDeviceListSort = useSetAtom(deviceListSortAtom)
  const setDeviceListSortBy = useSetAtom(deviceListSortByAtom)

  React.useEffect(
    () => () => {
      setFetchingAppList(true)
      setFetchingDeviceTypeList(true)
      setCurrentStep(Platform.Step.SELECT_APP)
      setSelectDeviceType(null)
      setDeviceTypeList([])
      setAppList([])
      setCreateAppOpen(false)
      setSelectedApp(undefined)
      setSelectedDeviceGroup(null)
      setExpire(-1)
      setLimit(1)
      setSyncType('sync')
      setSelectedDeviceList([])
      setMaxLimit(0)
      setDeviceListSort('desc')
      setDeviceListSortBy('registered_time')
      setFetchingDeviceTypeList(false)
      setFetchingAppList(false)
    },
    [currentTaskId]
  )
}
