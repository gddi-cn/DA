import appAPI from '@src/apis/app'
import { useAtom } from 'jotai'
import React from 'react'
import produce from 'immer'

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
} from './store'

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
        setPageSize(32)
        setInput(undefined)
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

export const useRefreshAppList = () => {
  const [, setAppList] = useAtom(appListAtom)
  const [, setTotal] = useAtom(appTotalAtom)
  const [loading, setLoading] = useAtom(fetchingAppAtom)
  const [page, setPage] = useAtom(pageFilterAtom)
  const [page_size, setPageSize] = useAtom(pageSizeFilterAtom)
  const [name] = useAtom(nameFilterAtom)
  const [selectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [selectedTemplateLabel] = useAtom(selectedTemplateLabelOptionAtom)
  const [inputOption] = useAtom(templateInputAtom)

  const device = selectedDeviceType?.value
  const label = selectedTemplateLabel?.value
  const input = inputOption?.value

  return async (firstPage = false) => {
    if (loading) return

    setLoading(true)
    firstPage && setPage(1)
    const { success, data } = await appAPI.list({
      page,
      page_size,
      device,
      name,
      label,
      input,
    })
    setLoading(false)

    if (!success || !data?.items) {
      setTotal(0)
      setAppList([])
      return
    }

    if (firstPage) {
      setAppList(data.items || [])
    } else {
      setAppList(produce(draft => {
        draft.push(...(data.items || []))
      }))
    }

    setTotal(data?.total || 0)
  }
}

const useListFilter = () => {
  const initRef = React.useRef<boolean>(false)
  const [page] = useAtom(pageFilterAtom)
  const [page_size] = useAtom(pageSizeFilterAtom)
  const [name] = useAtom(nameFilterAtom)
  const [selectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [selectedTemplateLabel] = useAtom(selectedTemplateLabelOptionAtom)
  const [inputOption] = useAtom(templateInputAtom)

  const refresh = useRefreshAppList()

  React.useEffect(
    () => {
      refresh(Boolean(!initRef.current))
    },
    [page]
  )
   
  React.useEffect(
    () => {
      if (!initRef.current) {
        initRef.current = true
        return 
      }
      refresh(true)
    },
    [page_size, name, selectedDeviceType, selectedTemplateLabel, inputOption]
  )
}


export const useApp = () => {
  const [currentPage] = useAtom(currentPageAtom)

  useResetStore()
  useListFilter()
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
