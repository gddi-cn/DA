import React from 'react'
import { useAtom } from 'jotai'

import Dialog from '../../../components/Dialog'
import ApplyButton from './ApplyButton'
import DeviceRegister from './DeviceRegister'
import DeviceSelect from './DeviceSelect'
import DaySelect from '../../../components/DaySelect'
import DaySelectFooter from './DaySelectFooter'
import RegisterResult from './RegisterResult'

import { useApply, useResetApplyStore } from './hook'
import { stepAtom } from './store'

const Apply: React.FC = () => {
  useResetApplyStore()
  const { open, openDialog, closeDialog } = useApply()
  const [step] = useAtom(stepAtom)

  const content = React.useMemo(
    () => {
      switch (step) {
        case 'device':
          return <DeviceSelect />
        case 'register':
          return <DeviceRegister />
        case 'date':
          return <DaySelect Footer={DaySelectFooter} />
        case 'reg_res':
          return <RegisterResult />
        default:
          return  null
      }
    },
    [step]
  )

  return (
    <>
      <ApplyButton openDialog={openDialog} />
      <Dialog open={open} onClose={closeDialog} transitionName={''} maskTransitionName={''} destroyOnClose>
        { content }
      </Dialog>
    </>
  )
}

export default Apply
