import syncAPI from "@src/apis/sync"
import { useAtom } from "jotai"
import React from "react"
import { Space } from "../../enums"
import {
  currentAppIdAtom, fetchingSyncListAtom,
  currentPageAtom, currentSyncAtom, fetchingSyncAtom,
  syncListAtom, syncListPageAtom, syncListPageSizeAtom,
  syncListTotalAtom
} from "./store"

const useResetStore = () => {
  const [, setList] = useAtom(syncListAtom)
  const [, setPage] = useAtom(syncListPageAtom)
  const [, setPageSize] = useAtom(syncListPageSizeAtom)
  const [, setTotal] = useAtom(syncListTotalAtom)
  const [, setLoading] = useAtom(fetchingSyncListAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentSyncID] = useAtom(currentSyncAtom)
  const [, setFetchingSync] = useAtom(fetchingSyncAtom)
  const [, setCurrentAppId] = useAtom(currentAppIdAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setFetchingSync(true)
      setList([])
      setPage(1)
      setPageSize(20)
      setTotal(0)
      setCurrentPage(Space.Deploy.Page.LIST)
      setCurrentSyncID(undefined)
      setCurrentAppId(undefined)
      setFetchingSync(false)
      setLoading(false)
    },
    []
  )
}

export const useRefreshSyncList = () => {
  const [, setList] = useAtom(syncListAtom)
  const [page, setPage] = useAtom(syncListPageAtom)
  const [page_size] = useAtom(syncListPageSizeAtom)
  const [, setTotal] = useAtom(syncListTotalAtom)
  const [loading, setLoading] = useAtom(fetchingSyncListAtom)
  
  return async (firstPage = false) => {
    if (loading) return

    setLoading(true)
    firstPage && setPage(1)
    const { success, data } = await syncAPI.list({ page_size, page })
    setLoading(false)

    if (!success || !data) {
      return
    }

    setList(data?.items || [])
    setTotal(data?.total || 0)
  }
}

export const useDeploy = () => {
  useResetStore()
  const [page] = useAtom(syncListPageAtom)
  const [page_size] = useAtom(syncListPageSizeAtom)
  const [currentPage] = useAtom(currentPageAtom)

  const initRef = React.useRef<boolean>(false)

  const refreshSyncList = useRefreshSyncList()

  React.useEffect(
    () => {
      refreshSyncList()
    },
    [page]
  )

  React.useEffect(
    () => {
      if (!initRef.current) {
        initRef.current = true
        return
      }
      refreshSyncList(true)
    },
    [page_size]
  )

  return {
    currentPage,
  }
}

