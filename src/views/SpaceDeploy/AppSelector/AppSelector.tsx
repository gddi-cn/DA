import React from 'react'
import { useAtom, useAtomValue } from 'jotai'

import List from './List'
import Detail from './Detail'
import { currentAppIdAtom, detailOpenAtom } from './store'

const AppSeclector: React.FC = () => {
  return (
    <>
      <List />
      <Detail />
    </>
  )
}

export default AppSeclector
