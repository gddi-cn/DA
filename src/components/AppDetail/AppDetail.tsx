import React from 'react'

import { useAppDetail } from './hook'
import { AppDetail as Detail } from './enums'

import Info from './Info'
import Config from './Config'
import Deploy from './Deploy'

interface AppDetailProps extends Pick<App.Instance, 'id'> {
  defaultPage?: Detail.Page
  onDelete?(): void
  onClose?(): void
}

const AppDetail: React.FC<AppDetailProps> = (
  {
    id,
    onDelete,
    onClose,
    defaultPage
  }
) => {
  const {
    currentPage,
  } = useAppDetail(id, onDelete, onClose, defaultPage)

  return (
    <>
      {currentPage === Detail.Page.INFO ? <Info /> : null}
      {currentPage === Detail.Page.CONFIG ? <Config onClose={onClose} /> : null}
      {currentPage === Detail.Page.DEPLOY ? <Deploy /> : null}
    </>
  )
}

export default AppDetail

