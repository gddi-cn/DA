import React from 'react'
import { useAtomValue } from 'jotai'

import { currentPageAtom } from './store'
import { AppSelector as NAppSelector } from './enums'

import List from './List'
import Detail from './Detail'

const AppSeclector: React.FC = () => {
  // useResetAppSelectorStore()
  const currentPage = useAtomValue(currentPageAtom)
  if (currentPage === NAppSelector.Page.LIST)
    return <List />
  
  if (currentPage === NAppSelector.Page.DETAIL)
    return <Detail />

  return null
}

export default AppSeclector
