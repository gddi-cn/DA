import { Space } from "@src/views/Space/enums"
import { useAtom } from "jotai"
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

export const useDeployList = () => {
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
