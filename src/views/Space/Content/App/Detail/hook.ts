import React from 'react'
import { useAtom } from 'jotai'
import {
  currentPageAtom,
  currentAppIdAtom,
} from '../store'
import { Space } from '@src/views/Space/enums'
import { useRefreshAppList } from '../List/hook'

export const useAppItem = () => {
  const [appId, setAppId] = useAtom(currentAppIdAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const refreshList = useRefreshAppList()

  const handleCancel = () => {
    setCurrentPage(Space.App.Page.LIST)
  }

  const handleDelete = () => {
    refreshList()
    setCurrentPage(Space.App.Page.LIST)
    setAppId(undefined)
  }

  React.useEffect(
    () => {
      return () => {
        setAppId(undefined)
      }
    },
    []
  )

  return {
    id: appId,
    handleCancel,
    handleDelete,
  }
}

