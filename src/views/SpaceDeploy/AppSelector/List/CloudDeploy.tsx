import React from 'react'

import { SecondaryBtn } from '@src/components/Btn'
import CloudAuth from '@src/components/CloudAuth'
import { useAtomValue } from 'jotai'
import { selectedAppListAtom } from '../../store'

const useCloudDeploy = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const selectedAppList = useAtomValue(selectedAppListAtom)
  const appIds = selectedAppList.map(x => x.id)

  const handleOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return {
    open,
    appIds,
    handleOpen,
    onClose,
  }
}

const CloudDeploy: React.FC = () => {
  const {
    open,
    appIds,
    handleOpen,
    onClose,
  } = useCloudDeploy()

  return (
    <>
      <SecondaryBtn onClick={handleOpen}>
        云授权
      </SecondaryBtn>
      <CloudAuth
        open={open}
        onClose={onClose}
        appIds={appIds}
      />
    </>
  )
}

export default CloudDeploy
