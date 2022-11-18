import React from 'react'

import Dialog from '../Dialog'
import ApplyButton from './ApplyButton'
import DeviceGroupSelector from './DeviceGroupSelector'

import { useApply } from './hook'

const Apply: React.FC = () => {
  const { open, openDialog, closeDialog } = useApply()

  return (
    <>
      <ApplyButton openDialog={openDialog} />
      <Dialog open={open} onClose={closeDialog}>
        <DeviceGroupSelector />
      </Dialog>
    </>
  )
}

export default Apply
