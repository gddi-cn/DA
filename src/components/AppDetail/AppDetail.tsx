import React from 'react'
import { useAppDetail } from './hook'
import { AppDetail as Detail } from './enums'

import Info from './Info'
import Config from './Config'
import Deploy from './Deploy'

const AppDetail: React.FC<Pick<App.Instance, 'id'>> = (
  {
    id,
  }
) => {
  const {
    currentPage,
  } = useAppDetail(id)

  return (
    <>
      { currentPage === Detail.Page.INFO ? <Info /> : null }
      { currentPage === Detail.Page.CONFIG ? <Config /> : null }
      { currentPage === Detail.Page.DEPLOY ? <Deploy /> : null }
    </>
  )
}

export default AppDetail

