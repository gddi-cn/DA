import React from 'react'

import { useApp } from './hook'

import List from './List'
import Detail from './Detail'
import Create from './Create'
import { Space } from '../../enums'

const App: React.FC = () => {
  const { currentPage } = useApp()
  return (
    <>
      { currentPage === Space.App.Page.LIST ? <List /> : null }
      { currentPage === Space.App.Page.DETAIL ? <Detail /> : null }
      { currentPage === Space.App.Page.CREATE ? <Create /> : null }
    </>
  )
}

export default App

