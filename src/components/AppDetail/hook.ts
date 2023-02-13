import { useAtom } from 'jotai'
import React from 'react'
import { appAtom, currentPageAtom, fetchingAppAtom } from './store'
import appAPI from '@src/apis/app'
import { AppDetail } from './enums'

const useResetStore = () => {
  const [, setFetchingApp] = useAtom(fetchingAppAtom)
  const [, setApp] = useAtom(appAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  React.useEffect(
    () => {
      return () => {
        setFetchingApp(true)
        setApp(null)
        setCurrentPage(AppDetail.Page.INFO)
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

export const useAppDetail = (id: App.Instance['id']) => {
  const [currentPage] = useAtom(currentPageAtom)

  useResetStore()
  const refresh = useRefresh()

  React.useEffect(
    () => {
      refresh(id)
    },
    [id]
  )

  return {
    currentPage,
  }
}
