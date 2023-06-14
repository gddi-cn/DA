import { atom, useSetAtom } from "jotai";
import { AppSelector } from "./enums";
import React from "react";
import { selectedAppListAtom, selectedChipAtom } from '../store'
import { AppTemplateInput } from "@src/shared/enum/application";

export const currentPageAtom = atom<AppSelector.Page>(AppSelector.Page.LIST)

export const currentAppIdAtom = atom<App.Instance['id'] | undefined>(undefined)

const defaultFilter: App.ListParams = {
  name: '',
  device: undefined,
  page: 1,
  page_size: 20,
  input: AppTemplateInput.VIDEO_STREAM,
  label: undefined,
}

export const filterAtom = atom<App.ListParams>({...defaultFilter})

export const nameFilterAtom = atom(
  get => get(filterAtom).name || '',
  (_, set, update: string) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: 1,
      name: update,
    }))
  }
)

export const deviceFilterAtom = atom(
  get => get(filterAtom).device,
  (_, set, update: App.ListParams['device']) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: 1,
      device: update
    }))
    set(selectedChipAtom, update || null)
    set(selectedAppListAtom, [])
  }
)

export const pageFilterAtom = atom(
  get => get(filterAtom).page,
  (_, set, update: App.ListParams['page']) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: update,
    }))
  }
)

export const pageSizeFilterAtom = atom(
  get => get(filterAtom).page_size,
  (_, set, update: App.ListParams['page_size']) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: 1,
      page_size: update
    }))
  }
)

export const inputFilterAtom = atom(
  get => get(filterAtom).input,
  (_, set, update: App.ListParams['input']) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: 1,
      input: update,
    }))
    set(selectedAppListAtom, [])
  }
)

export const labelFilterAtom = atom(
  get => get(filterAtom).label,
  (_, set, update: App.ListParams['label']) => {
    set(filterAtom, (prev) => ({
      ...prev,
      page: 1,
      label: update
    }))
  }
)

export const deviceChipOptionAtom = atom<Device.Chip.Option | undefined>(undefined)

export const chipTypeListAtom = atom<Device.Chip.Instance[]>([])

export const totalAtom = atom<number>(0)
export const appListAtom = atom<App.Instance[]>([])
export const fetchingAppListAtom = atom<boolean>(false)

export const useResetAppSelectorStore = () => {
  const setCurrentPage = useSetAtom(currentPageAtom)
  const setCurrentAppId = useSetAtom(currentAppIdAtom)
  const setFilter = useSetAtom(filterAtom)
  const setTotal = useSetAtom(totalAtom)
  const setAppList = useSetAtom(appListAtom)
  const setFetchingAppList = useSetAtom(fetchingAppListAtom)
  const setDeviceOption = useSetAtom(deviceChipOptionAtom)

  return () => {
    setFetchingAppList(true)
    setCurrentPage(AppSelector.Page.LIST)
    setCurrentAppId(undefined)
    setFilter({...defaultFilter})
    setTotal(0)
    setAppList([])
    setDeviceOption(undefined)
    setFetchingAppList(false)
  }
}