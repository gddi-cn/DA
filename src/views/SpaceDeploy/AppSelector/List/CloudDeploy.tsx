import React from 'react'

import { SecondaryBtn } from '@src/components/Btn'
import CloudAuth from '@src/components/CloudAuth'

const useCloudDeploy = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    onClose,
  }
}

const CloudDeploy: React.FC = () => {
  const {
    open,
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
      />
    </>
  )
}

export default CloudDeploy
