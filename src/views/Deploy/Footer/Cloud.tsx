import { SecondaryBtn } from '@src/components/Btn'
import CloudAuth from '@src/components/CloudAuth/CloudAuth'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { recordOpenAtom, recoredDefaultTabAtom, selectedAppAtom } from '../store'
import { AuthRecordTab } from '@src/components/AuthRecord'

const useCloud = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const setRecordOpen = useSetAtom(recordOpenAtom)
  const setDefaultTab = useSetAtom(recoredDefaultTabAtom)
  const selectedApp = useAtomValue(selectedAppAtom)
  const disabled = !selectedApp

  const onAuth = () => {
    setOpen(false)
    setDefaultTab(AuthRecordTab.CLOUD)
    setTimeout(() => {
      setRecordOpen(true) 
    });
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    appIds: selectedApp?.id ? [selectedApp.id] : [],
    disabled,
    handleOpen,
    handleClose,
    onAuth,
  }
}

const Cloud: React.FC = () => {
  const {
    open,
    appIds,
    disabled,
    handleOpen,
    handleClose,
    onAuth,
  } = useCloud()

  return (
    <>
      <SecondaryBtn disabled={disabled} onClick={handleOpen}>
        云授权
      </SecondaryBtn>
      <CloudAuth
        open={open}
        onClose={handleClose}
        onAuth={onAuth}
        appIds={appIds}
      />
    </>
  )
}

export default Cloud
