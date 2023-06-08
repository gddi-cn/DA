import { AppTemplateInput } from '@src/shared/enum/application'
import { atom, useAtom, useSetAtom } from 'jotai'
import React from 'react'
import { positionValues } from 'react-custom-scrollbars'
import { Space } from '../../../enums'
import { GroupDevice } from '@src/shared/types/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'

export const DEFAULT_PAGE_SIZE = 32

export const stepAtom = atom<Space.Deploy.Create.Step>(Space.Deploy.Create.Step.DEVICE)

export const deviceTypeAtom = atom<Device.Chip.Option | undefined>(undefined)

// ============================== APP List =====================================
export const appListAtom = atom<Array<App.Instance>>([])
export const appTotalAtom = atom<number>(0)
export const fetchingAppAtom = atom<boolean>(false)
export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])


// app list filter
export const pageFilterAtom = atom<number>(1)
export const pageSizeFilterAtom = atom<number>(DEFAULT_PAGE_SIZE)
export const nameFilterAtom = atom<string | undefined>(undefined)
export const templateLabelListAtom = atom<Array<string>>([])
export const selectedTemplateLabelOptionAtom =
  atom<{ key: string, value: string, label: string } | null>(null)
export const templateInputAtom = atom<AppTemplateInput>(AppTemplateInput.VIDEO_STREAM)

export const listInitAtom = atom<boolean>(false)

export const scrollbarRefAtom =
  atom<React.MutableRefObject<{ getValues(): positionValues } | null> | undefined>(undefined)

export const selectedAppListAtom = atom<Array<App.Instance>>([])

// ============================== App List =====================================

// ============================== Device List =====================================
export const selectedDeviceListAtom = atom<Array<GroupDevice>>([])

export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const deviceListAtom = atom<Array<GroupDevice>>([])

export const deviceNameAtom = atom<string>('')

export const devicePageAtom = atom<number>(1)

export const devicePageSizeAtom = atom<number>(10)

export const deviceTotalAtom = atom<number>(0)

export const fetchingDeviceAtom = atom<boolean>(false)

export const sortAtom = atom<'asc' | 'desc'>('desc')

export const sortByAtom = atom<'name' | 'registered_time'>('registered_time')
// ============================== Device List =====================================

// ================================ Config ========================================
export const noExpireAtom = atom<boolean>(true)
export const expireAtom = atom<number>(-1)
export const limitAtom = atom<number>(1)
// ================================ Config ========================================


export const useResetStore = () => {
  const [, setStep] = useAtom(stepAtom)
  const [, setDeviceType] = useAtom(deviceTypeAtom)
  const [, setAppList] = useAtom(appListAtom)
  const [, setTotal] = useAtom(appTotalAtom)
  const [, setLoading] = useAtom(fetchingAppAtom)
  const [, setName] = useAtom(nameFilterAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setTemplateLabelList] = useAtom(templateLabelListAtom)
  const [, setSelectedTemplateLabelOption] = useAtom(selectedTemplateLabelOptionAtom)
  const [, setPage] = useAtom(pageFilterAtom)
  const [, setPageSize] = useAtom(pageSizeFilterAtom)
  const [, setInput] = useAtom(templateInputAtom)
  const [, setInit] = useAtom(listInitAtom)
  const [, setSelectedAppList] = useAtom(selectedAppListAtom)
  const [, setSelectedDeviceList] = useAtom(selectedDeviceListAtom)
  const [, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)
  const [, setDeviceList] = useAtom(deviceListAtom)
  const [, setDeviceName] = useAtom(deviceNameAtom)
  const [, setDevicePage] = useAtom(devicePageAtom)
  const [, setDevicePageSize] = useAtom(devicePageSizeAtom)
  const [, setDeviceTotal] = useAtom(deviceTotalAtom)
  const [, setFetchingDevice] = useAtom(fetchingDeviceAtom)
  const setSort = useSetAtom(sortAtom)
  const setSortBy = useSetAtom(sortByAtom)
  const [, setLimit] = useAtom(limitAtom)
  const [, setExpire] = useAtom(expireAtom)
  const [, setNoExpire] = useAtom(noExpireAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setFetchingDevice(true)
      setAppList([])
      setTotal(0)
      setName(undefined)
      setDeviceTypeList([])
      setTemplateLabelList([])
      setSelectedTemplateLabelOption(null)
      setPage(1)
      setPageSize(DEFAULT_PAGE_SIZE)
      setInput(AppTemplateInput.VIDEO_STREAM)
      setStep(Space.Deploy.Create.Step.DEVICE)
      setDeviceType(undefined)
      setSelectedAppList([])
      setInit(false)
      setSelectedDeviceList([])
      setSelectedDeviceGroup(null)
      setDeviceList([])
      setDeviceName('')
      setDevicePage(1)
      setDevicePageSize(10)
      setDeviceTotal(0)
      setSort('desc')
      setSortBy('registered_time')
      setLimit(1)
      setExpire(-1)
      setNoExpire(true)
      setFetchingDevice(false)
      setLoading(false)
    },
    []
  )
}
