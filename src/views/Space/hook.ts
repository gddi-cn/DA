import React from 'react'
import { useAtom } from 'jotai'
import { currentPageAtom } from './store'

import { Space } from './enums'

const useResetStore = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const resetStore = () => {
    setCurrentPage(Space.Page.USAGE)
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
