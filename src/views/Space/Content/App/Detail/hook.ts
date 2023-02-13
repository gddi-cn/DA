import React from 'react'
import { useAtom } from 'jotai'
import {
  currentPageAtom,
  currentAppIdAtom,
} from '../store'
import { Space } from '@src/views/Space/enums'

export const useAppItem = () => {
  const [appId, setAppId] = useAtom(currentAppIdAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleCancel = () => {
    setCurrentPage(Space.App.Page.LIST)
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
  }
}

