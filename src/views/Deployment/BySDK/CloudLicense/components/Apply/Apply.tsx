import React from 'react'

import { useApply } from './hook'

import ApplyButton from './ApplyButton'
import DaySelect from '../../../components/DaySelect'
import DaySelectFooter from './DaySelectFooter'
import Dialog from '@views/Deployment/BySDK/components/Dialog'

const Apply: React.FC = () => {
  const { open, openDialog, closeDialog } = useApply()

  return (
    <>
      <ApplyButton openDialog={openDialog} />
      <Dialog open={open} onClose={closeDialog}>
        <DaySelect Footer={DaySelectFooter} />
      </Dialog>
    </>
  )
}

export default Apply
