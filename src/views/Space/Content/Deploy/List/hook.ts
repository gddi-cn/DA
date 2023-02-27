import { Space } from "@src/views/Space/enums"
import { useAtom } from "jotai"
import React from "react"
import { useRefreshSyncList } from "../hook"
import {
  currentPageAtom,
  currentSyncAtom,
  fetchingSyncListAtom,
  syncListAtom,
  syncListPageAtom,
  syncListPageSizeAtom,
  syncListTotalAtom
} from "../store"

export const useCreateBtn = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleClick = () => {
    setCurrentPage(Space.Deploy.Page.CREATE)
  }

  return {
    handleClick,
  }
}

export const useList = () => {
  const [syncList] = useAtom(syncListAtom)
  const [loading] = useAtom(fetchingSyncListAtom)

  return {
    empty: syncList.length <= 0,
    loading,
  }
}

const useSchedule = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const refreshSyncList = useRefreshSyncList()

  React.useEffect(
    () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(
        () => refreshSyncList(false, false)
        , 5e3
      )

      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    []
  )
}

export const useDeployList = () => {
  useSchedule()

  const [syncList] = useAtom(syncListAtom)
  const [page, setPage] = useAtom(syncListPageAtom)
  const [pageSize, setPageSize] = useAtom(syncListPageSizeAtom)
  const [total] = useAtom(syncListTotalAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentSync] = useAtom(currentSyncAtom)

  const handleChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }

  const handleClick = (sync: Sync.Instance) => {
    if (!sync) return

    setCurrentSync(sync) 
    setCurrentPage(Space.Deploy.Page.DETAIL)
  }

  return {
    syncList,
    page,
    pageSize,
    total,
    handleChange,
    handleClick,
  }
}
