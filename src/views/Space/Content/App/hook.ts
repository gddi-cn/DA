import appAPI from '@src/apis/app'
import { useAtom } from 'jotai'
import React from 'react'

import { Space } from '../../enums'
import {
  appListAtom,
  fetchingAppAtom,
  nameFilterAtom,
  selectedDeviceTypeAtom,
  deviceTypeListAtom,
  appTotalAtom,
  currentPageAtom,
  currentAppIdAtom,
  templateLabelListAtom,
  selectedTemplateLabelOptionAtom,
  pageFilterAtom,
  pageSizeFilterAtom,
  templateInputAtom,
  listInitAtom,
  DEFAULT_PAGE_SIZE,
} from './store'

import { useAppListFetcher } from './List/hook'

const useResetStore = () => {
  const [, setAppList] = useAtom(appListAtom)
  const [, setTotal] = useAtom(appTotalAtom)
  const [, setLoading] = useAtom(fetchingAppAtom)
  const [, setName] = useAtom(nameFilterAtom)
  const [, setSelectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentAppId] = useAtom(currentAppIdAtom)
  const [, setTemplateLabelList] = useAtom(templateLabelListAtom)
  const [, setSelectedTemplateLabelOption] = useAtom(selectedTemplateLabelOptionAtom)
  const [, setPage] = useAtom(pageFilterAtom)
  const [, setPageSize] = useAtom(pageSizeFilterAtom)
  const [, setInput] = useAtom(templateInputAtom)
  const [, setInit] = useAtom(listInitAtom)

  React.useEffect(
    () => {
      return () => {
        setLoading(true)
        setAppList([])
        setTotal(0)
        setName(undefined)
        setSelectedDeviceType(null)
        setDeviceTypeList([])
        setCurrentPage(Space.App.Page.LIST)
        setCurrentAppId(undefined)
        setTemplateLabelList([])
        setSelectedTemplateLabelOption(null)
        setPage(1)
        setPageSize(DEFAULT_PAGE_SIZE)
        setInput(undefined)
        setInit(false)
        setLoading(false)
      }
    },
    []
  )
}

const useRefreshTemplateLabelList = () => {
  const [, setTemplateLabelList] = useAtom(templateLabelListAtom)

  return async () => {
    const { success, data } = await appAPI.templateLabelList()

    if (!success || !data) {
      setTemplateLabelList([])
      return
    }

    setTemplateLabelList(data)
  }
}



export const useApp = () => {
  const [currentPage] = useAtom(currentPageAtom)

  useAppListFetcher()
  useResetStore()

  const refreshTemplateLabelList = useRefreshTemplateLabelList()

  React.useEffect(
    () => {
      refreshTemplateLabelList()
    },
    []
  )

  return {
    currentPage,
  }
}
