import React from 'react'

import Dialog from '@src/components/Dialog'
import { Dataset } from '@src/shared/types/dataset'
import { SmallButton } from '@src/UIComponents'
import { useImportHistory } from './hook'
import List from './List'

const ImportHistory: React.FC<Dataset> = (
  {
    id,
  }
) => {
  const { open, handleOpen, handleClose } = useImportHistory()
  return (
    <>
      <SmallButton type='nomal' onClick={handleOpen}>更新记录</SmallButton>
      <Dialog
        open={open}
        footer={null}
        onCancel={handleClose}
        width={1400}
        title={'更新记录'}
        centered={false}
        destroyOnClose
      >
        <List id={id} />
      </Dialog>
    </>
  )
}

export default ImportHistory
