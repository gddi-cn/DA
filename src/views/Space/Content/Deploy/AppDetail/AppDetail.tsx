import React from 'react'

import { useAppDetail } from './hook'
import Detail  from '@src/components/AppDetail'

const AppDetail: React.FC = () => {
  const {
    appId,
    handleClose,
  } = useAppDetail()

  return appId ? (
    <>
      <Detail
        id={appId}
        onClose={handleClose}
        onDelete={handleClose}
      />
    </>
  ) : null
}

export default AppDetail

