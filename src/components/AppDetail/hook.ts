import { useAtom } from 'jotai'
import React from 'react'
import { appAtom, currentPageAtom, deployRecordListAtom, fetchingAppAtom, fetchingRecordAtom } from './store'
import appAPI from '@src/apis/app'
import { AppDetail } from './enums'

const useResetStore = () => {
  const [, setFetchingApp] = useAtom(fetchingAppAtom)
  const [, setApp] = useAtom(appAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setDeployRecordList] = useAtom(deployRecordListAtom)
  const [, setFetchingRecord] = useAtom(fetchingRecordAtom)

  React.useEffect(
    () => {
      return () => {
        setFetchingApp(true)
        setFetchingRecord(true)
        setApp(null)
        setCurrentPage(AppDetail.Page.INFO)
        setDeployRecordList([])
        setFetchingRecord(false)
        setFetchingApp(false)
      }
    },
    []
  )
}

export const useRefresh = () => {
  const [, setDetail] = useAtom(appAtom)
  const [loading, setLoading] = useAtom(fetchingAppAtom)

  return async (id: App.Instance['id']) => {
    if (loading) return

    setLoading(true)
    const { success, data } = await appAPI.detail(id)
    setLoading(false)

    if (!success || !data)
      return setDetail(null)

    setDetail(data)
  }
}

export const useRefreshRecord = () => {
  const [loading, setLoading] = useAtom(fetchingRecordAtom)
  const [, setRecordList] = useAtom(deployRecordListAtom)

  return async (id: App.Instance['id']) => {
    if (loading) return

    setLoading(true)
    const { success, data } = await appAPI.syncList(id)
    setLoading(false)

    if (!success || !data?.items) {
      setRecordList([])
      return
    }
    
    setRecordList(data.items || [])
  }
}

export const useAppDetail = (id: App.Instance['id']) => {
  const [currentPage] = useAtom(currentPageAtom)

  useResetStore()
  const refresh = useRefresh()
  const refreshRecord = useRefreshRecord()

  React.useEffect(
    () => {
      refresh(id)
      refreshRecord(id)
    },
    [id]
  )

  return {
    currentPage,
  }
}
