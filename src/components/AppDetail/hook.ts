import { useAtom } from 'jotai'
import React from 'react'
import { appAtom, currentPageAtom, currentRecordAtom, deployRecordListAtom, fetchingAppAtom, fetchingRecordAtom, onCloseRefAtom, onDeleteRefAtom } from './store'
import appAPI from '@src/apis/app'
import { AppDetail } from './enums'

const useResetStore = () => {
  const [, setFetchingApp] = useAtom(fetchingAppAtom)
  const [, setApp] = useAtom(appAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setDeployRecordList] = useAtom(deployRecordListAtom)
  const [, setFetchingRecord] = useAtom(fetchingRecordAtom)
  const [, setOnDelete] = useAtom(onDeleteRefAtom)
  const [, setOnCloseRef] = useAtom(onCloseRefAtom)
  const [, setCurrentRecord] = useAtom(currentRecordAtom)

  React.useEffect(
    () => {
      return () => {
        setFetchingApp(true)
        setFetchingRecord(true)
        setApp(null)
        setCurrentPage(AppDetail.Page.INFO)
        setDeployRecordList([])
        setOnDelete(undefined)
        setOnCloseRef(undefined)
        setCurrentRecord(undefined)
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

export const useAppDetail = (
  id: App.Instance['id'],
  onDelete?: () => void,
  onClose?: () => void,
  defaultPage?: AppDetail.Page
) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [, setOnDeleteRef] = useAtom(onDeleteRefAtom)
  const [, setOnCloseRef] = useAtom(onCloseRefAtom)
  const onDeleteRef = React.useRef<(() => void) | undefined>(onDelete)
  const onCloseRef = React.useRef<(() => void) | undefined>(onClose)

  useResetStore()
  const refresh = useRefresh()
  const refreshRecord = useRefreshRecord()

  React.useEffect(
    () => {
      Promise.all([refresh(id), refreshRecord(id)])
        .then(_ => {
          setCurrentPage(defaultPage || AppDetail.Page.INFO)
        })
    },
    [id]
  )

  React.useEffect(
    () => {
      setOnDeleteRef(onDeleteRef)
      setOnCloseRef(onCloseRef)
    },
    []
  )

  return {
    currentPage,
  }
}
