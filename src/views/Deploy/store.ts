import { atom, useSetAtom } from "jotai";
import { Deploy } from "./enums";
import { atomWithRefresh } from "@src/utils/atomCreators";
import appAPI from "@src/apis/app";
import React from "react";
import { DeviceGroupOptions } from "@src/shared/types/deviceGroup";
import { GroupDevice } from "@src/shared/types/device";
import { AuthRecordTab } from "@src/components/AuthRecord";
import { AppTemplateInput } from "@src/shared/enum/application";
import { currentModelVersionIdAtom } from "@src/store/dataset";

export const currentStepAtom = atom<Deploy.Step>(Deploy.Step.SELECT_APP)

export const selectedAppAtom = atom<App.Instance | null>(null)

export const hideChannelAtom = atom<boolean>(get => {
  const selectedApp = get(selectedAppAtom)
  return selectedApp?.input === AppTemplateInput.IMAGE
})

export const appListAtom = atomWithRefresh(async (get) => {
  const model_iter_id = get(currentModelVersionIdAtom)
  if (!model_iter_id) return []

  const { success, data } = await appAPI.list({
    page: 1,
    page_size: 999,
    model_iter_id,
  })

  if (!success || !data?.items) return []

  return data.items
})

export const createAppOpenAtom = atom<boolean>(false)

export const currentAppIdAtom = atom<App.Instance['id'] | null>(null)

export const appDetailOpenAtom = atom<boolean>(false)

// Device
export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const groupDeviceListAtom = atom<Array<GroupDevice>>([])

export const fetchingGroupDeviceAtom = atom<boolean>(false)

export const groupDeviceTotalAtom = atom<number>(0)

export const groupDevicePageAtom = atom<number>(1)

export const groupDevicePageSizeAtom = atom<number>(10)

export const selectedDeviceIdListAtom = atom<Array<GroupDevice['id']>>([])


// Config
export const expireAtom = atom<number>(-1)

export const limitAtom = atom<number>(1)

export const syncTypeAtom = atom<'export' | 'sync'>('sync')

export const maxLimitAtom = atom<number>(0)

export const deviceListSortAtom = atom<'asc' | 'desc'>('desc')

export const deviceListSortByAtom = atom<'name' | 'registered_time'>('registered_time')


export const recoredDefaultTabAtom = atom<AuthRecordTab>(AuthRecordTab.DEVICE)

const _recordOpenAtom = atom<boolean>(false)
export const recordOpenAtom = atom(
  get => get(_recordOpenAtom),
  (_, set, open: boolean) => {
    set(_recordOpenAtom, open)
    if (!open) {
      set(recoredDefaultTabAtom, AuthRecordTab.DEVICE)
    }
  }
)


export const useResetStore = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)
  const setSelectedApp = useSetAtom(selectedAppAtom)
  const setCreateAppOpen = useSetAtom(createAppOpenAtom)
  const setCurrentApp = useSetAtom(currentAppIdAtom)
  const setAppDetailOpen = useSetAtom(appDetailOpenAtom)

  const setSelectedDeviceGroup = useSetAtom(selectedDeviceGroupAtom)
  const setGroupDeviceList = useSetAtom(groupDeviceListAtom)
  const setFetchingDeviceList = useSetAtom(fetchingGroupDeviceAtom)
  const setGroupDeviceTotal = useSetAtom(groupDeviceTotalAtom)
  const setGroupDevicePage = useSetAtom(groupDevicePageAtom)
  const setGroupDevicePageSize = useSetAtom(groupDevicePageSizeAtom)
  const setSelectedDeviceList = useSetAtom(selectedDeviceIdListAtom)

  const setExpire = useSetAtom(expireAtom)
  const setLimit = useSetAtom(limitAtom)
  const setSyncType = useSetAtom(syncTypeAtom)
  const setMaxLimit = useSetAtom(maxLimitAtom)
  const setDeviceListSort = useSetAtom(deviceListSortAtom)
  const setDeviceListSortBy = useSetAtom(deviceListSortByAtom)

  const setRecordOpen = useSetAtom(recordOpenAtom)
  const setRecordDefaultTab = useSetAtom(recoredDefaultTabAtom)

  return () => {
    setCurrentStep(Deploy.Step.SELECT_APP)
    setSelectedApp(null)
    setCreateAppOpen(false)
    setCurrentApp(null)
    setAppDetailOpen(false)
    setSelectedDeviceGroup(null)
    setGroupDeviceList([])
    setFetchingDeviceList(false)
    setGroupDeviceTotal(0)
    setGroupDevicePage(1)
    setGroupDevicePageSize(10)
    setSelectedDeviceList([])
    setExpire(-1)
    setLimit(1)
    setSyncType('sync')
    setMaxLimit(0)
    setDeviceListSort('desc')
    setDeviceListSortBy('registered_time')
    setRecordOpen(false)
    setRecordDefaultTab(AuthRecordTab.DEVICE)
  }
}