import groupDeviceAPI from "@src/apis/groupDevice";
import { RemoteSearchRef } from "@src/components/RemoteSearch";
import { DeviceGroupOptions } from "@src/shared/types/deviceGroup";
import { atom } from "jotai";

export const selectedDeviceIdListAtom = atom<GroupDevice.Instance['id'][]>([])

const _filterAtom = atom<GroupDevice.List.Params>({
  name: '',
  page: 1,
  page_size: 20,
  sort: 'desc',
  sort_by: 'registered_time',
})

export const filterAtom = atom(
  get => get(_filterAtom),
  (get, set, update: Partial<GroupDevice.List.Params>) => {
    set(selectedDeviceIdListAtom, [])
    set(_filterAtom, {
      ...get(_filterAtom),
      ...update,
    })
  }
)

export const nameAtom = atom(
  (get) => get(filterAtom).name,
  (get, set, update: string) => {
    set(filterAtom, {
      ...get(filterAtom),
      page: 1,
      name: update,
    })
  }
)

const _selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)
export const selectedDeviceGroupAtom = atom(
  get => get(_selectedDeviceGroupAtom),
  (get, set, update: DeviceGroupOptions | null) => {
    set(_selectedDeviceGroupAtom, update)
    set(filterAtom, {
      ...get(filterAtom),
      page: 1,
    })
  }
)

const groupIdAtom = atom(get => get(selectedDeviceGroupAtom)?.key)

export const pageAtom = atom(
  (get) => get(filterAtom).page,
  (get, set, update: number) => {
    set(filterAtom, {
      ...get(filterAtom),
      page: update,
    })
  }
)

export const pageSizeFilterAtom = atom(
  (get) => get(filterAtom).page_size,
  (get, set, update: number) => {
    set(filterAtom, {
      ...get(filterAtom),
      page: 1,
      page_size: update,
    })
  }
)


// desc 1
// asc 2
// registered 4
// name 8

export const sortFilterAtom = atom(
  (get) => ({
    sort: get(filterAtom).sort,
    sort_by: get(filterAtom).sort_by,
  }),
  (get, set, update: { sort: 'asc' | 'desc', sort_by: 'name' | 'registered_time' }) => {
    set(filterAtom, {
      ...get(filterAtom),
      page: 1,
      sort: update.sort,
      sort_by: update.sort_by,
    })
  }
)

const flagAtom = atom<boolean>(false)

export const deviceListDataAtom = atom(async (get) => {
  const _ = get(flagAtom)
  const filter = get(filterAtom)
  const group = get(groupIdAtom)
  if (!group && group !== 0) {
    return {
      total: 0,
      items: [],
    }
  }

  const { success, data } = await groupDeviceAPI.list(group, filter)

  if (!success || !data) {
    return {
      total: 0,
      items: [],
    }
  }

  return {
    total: data.total ?? 0,
    items: data.items ?? [],
  }
})

export const refreshDeviceListDataAtom = atom(
  null,
  (_, set) => {
    set(selectedDeviceIdListAtom, [])
    set(flagAtom, (f => !f))
  }
)

export const deviceListAtom = atom(get => get(deviceListDataAtom).items)
export const deviceListTotalAtom = atom(get => get(deviceListDataAtom).total)

export const groupSelectorRefAtom = atom<React.RefObject<RemoteSearchRef>|null>(null)
