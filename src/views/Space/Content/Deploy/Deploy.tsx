import React from 'react'

import { Space } from '../../enums'
import { useDeploy } from './hook'

import List from './List'
import Detail from './Detail'
import Create from './Create'
import AppDetail from './AppDetail'

const Deploy: React.FC = () => {
  const { currentPage } = useDeploy()

  return (
    <>
      { currentPage === Space.Deploy.Page.LIST ? <List /> : null }
      { currentPage === Space.Deploy.Page.DETAIL? <Detail /> : null }
      { currentPage === Space.Deploy.Page.CREATE ? <Create /> : null }
      { currentPage === Space.Deploy.Page.APP_DETAIL ? <AppDetail /> : null }
    </>
  )
}

export default Deploy

