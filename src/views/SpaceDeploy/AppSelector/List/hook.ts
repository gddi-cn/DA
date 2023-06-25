import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { appListAtom, currentAppIdAtom, defaultPageSize, detailOpenAtom, fetchingAppListAtom, filterAtom, pageSizeFilterAtom, totalAtom } from "../store"
import { selectedAppListAtom } from '../../store'
import appAPI from "@src/apis/app"
import React from "react"
import debounce from 'lodash/debounce'
import Scrollbars from "react-custom-scrollbars"

export const useFetchNextPageAppList = () => {
  const [pageSize, setPageSize] = useAtom(pageSizeFilterAtom)

  return () => {
    setPageSize(pageSize + defaultPageSize)
  }
}

export const useRefreshAppList = () => {
  const filter = useAtomValue(filterAtom)
  const setLoading = useSetAtom(fetchingAppListAtom)
  const setAppList = useSetAtom(appListAtom)
  const setTotal = useSetAtom(totalAtom)
  const fetchNextPageAppList = useFetchNextPageAppList()

  return async (getValues?: () => ({ scrollHeight: number, clientHeight: number }) | undefined) => {
    if (!filter.device) return
    setLoading(true)
    const { success, data } = await appAPI.list(filter)
    setLoading(false)

    if (!success || !data) {
      setTotal(0)
      setAppList([])
      return
    }


    setTotal(data?.total ?? 0)
    setAppList(data?.items ?? [])

    if (!getValues) return

    const { scrollHeight, clientHeight } = getValues() || {}
    if (!scrollHeight || !clientHeight) return


    if (scrollHeight <= clientHeight) {
      if (data?.total && (data.total <= filter.page_size)) return
      setTimeout(() => {
        fetchNextPageAppList()
      });
    }
  }
}

export const useList = () => {
  const filter = useAtomValue(filterAtom)
  const refresh = useRefreshAppList()
  const appList = useAtomValue(appListAtom)
  const setCurrentAppId = useSetAtom(currentAppIdAtom)
  const setDetailOpen = useSetAtom(detailOpenAtom)
  const [selectedAppList, setSelectedAppList] = useAtom(selectedAppListAtom)
  const scrollbarRef = React.useRef<Scrollbars>(null)
  const fetchNextPageAppList = useFetchNextPageAppList()
  const total = useAtomValue(totalAtom)

  const getValues = () => {
    if (!scrollbarRef.current) return undefined
    const { scrollHeight, clientHeight } = scrollbarRef.current.getValues()
    return { scrollHeight, clientHeight }
  }

  const getSelect = (id: App.Instance['id']) => selectedAppList.some(x => x.id === id)

  const handleSelectChange = (app: App.Instance, selected: boolean) => {
    if (selected && !getSelect(app.id)) {
      setSelectedAppList(pre => [app, ...pre])
    } else {
      setSelectedAppList(pre => pre.filter(x => x.id !== app.id))
    }
  }

  const handleScroll = debounce((top: number) => {
    if (top < 0.9) return
    if (total && (total <= filter.page_size)) return

    fetchNextPageAppList()
  }, 200)

  const handleDetail = (id: App.Instance['id']) => {
    setCurrentAppId(id)
    setDetailOpen(true)
  }

  React.useEffect(
    () => {
      refresh(getValues)
    },
    [filter]
  )

  return {
    scrollbarRef,
    appList,
    getSelect,
    handleSelectChange,
    handleDetail,
    handleScroll,
  }
}
