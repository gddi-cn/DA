import React from 'react'

import { useAppItem } from './hook'
import AppDetail from '@src/components/AppDetail'
import { AppDetail as EAppDetail } from '@src/components/AppDetail/enums'


const Detail: React.FC<{ defaultPage?: EAppDetail.Page }> = (
  {
    defaultPage,
  }
) => {
  const { id, handleCancel, handleDelete, } = useAppItem()

  return id ? (
    <AppDetail
      id={id} onDelete={handleDelete}
      onClose={handleCancel}
      defaultPage={defaultPage}
    />
  ) : null
}

export default Detail

