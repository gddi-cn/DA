import { useAtom } from 'jotai'
import React from 'react'

import {
  deviceTypeAtom,
  stepAtom,
  appListAtom,
  fetchingAppAtom,
  nameFilterAtom,
  deviceTypeListAtom,
  appTotalAtom,
  templateLabelListAtom,
  selectedTemplateLabelOptionAtom,
  pageFilterAtom,
  pageSizeFilterAtom,
  templateInputAtom,
  listInitAtom,
  DEFAULT_PAGE_SIZE,
  selectedAppListAtom,
  selectedDeviceListAtom,
  selectedDeviceGroupAtom,
  deviceListAtom,
  deviceNameAtom,
  devicePageAtom,
  devicePageSizeAtom,
  deviceTotalAtom,
  fetchingDeviceAtom,
  limitAtom,
  noExpireAtom,
  expireAtom,
} from './store'
import { Space } from '@src/views/Space/enums'
import { useAppListFetcher } from './AppSelector/hook'

const useResetStore = () => {
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
      setInput(undefined)
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
      setLimit(1)
      setExpire(-1)
      setNoExpire(true)
      setFetchingDevice(false)
      setLoading(false)
    },
    []
  )
}

export const useCreate = () => {
  useResetStore()
  useAppListFetcher()
  
  const [currentStep] = useAtom(stepAtom)

  return {
    currentStep,
  }
}

