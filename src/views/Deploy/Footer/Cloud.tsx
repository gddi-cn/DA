import { SecondaryBtn } from '@src/components/Btn'
import CloudAuth from '@src/components/CloudAuth/CloudAuth'
import { useAtomValue } from 'jotai'
import React from 'react'
import { selectedAppListAtom } from '../store'

const useCloud = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const selectedAppList = useAtomValue(selectedAppListAtom)
  const disabled = selectedAppList.length <= 0

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    disabled,
    handleOpen,
    handleClose,
  }
}

const Cloud: React.FC = () => {
  const {
    open,
    disabled,
    handleOpen,
    handleClose,
  } = useCloud()

  return (
    <>
      <SecondaryBtn disabled={disabled} onClick={handleOpen}>
        云授权
      </SecondaryBtn>
      <CloudAuth open={open} onClose={handleClose} />
    </>
  )
}

export default Cloud
