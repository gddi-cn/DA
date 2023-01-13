import React from 'react'
import { useAtom } from 'jotai'
import { currentPageAtom, fetchingUsageAtom, usageAtom } from './store'

import { Space } from './enums'
const useResetStore = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setUsage] = useAtom(usageAtom)
  const [, setFetchingUsage] = useAtom(fetchingUsageAtom)

  const resetStore = () => {
    setFetchingUsage(true)
    setCurrentPage(Space.Page.USAGE)
    setUsage(null)
    setFetchingUsage(false)
  }

  React.useEffect(
    () => {
      return resetStore
    },
    []
  )
}

export const useSpace = () => {
  useResetStore()
}
