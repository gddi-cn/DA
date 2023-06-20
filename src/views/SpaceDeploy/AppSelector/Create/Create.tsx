import { Dialog } from '@mui/material'
import { SecondaryBtn } from '@src/components/Btn'
import CreateApp from '@src/components/CreateApp/CreateApp'
import DialogTransition from '@src/components/DialogTransition'
import React from 'react'
import { useRefreshAppList } from '../List/hook'

const useCreate = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const refresh = useRefreshAppList()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onCreate = () => {
    refresh()
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    handleClose,
    onCreate,
  }
}

const Create: React.FC = () => {
  const {
    open,
    handleOpen,
    handleClose,
    onCreate,
  } = useCreate()

  return (
    <>
      <SecondaryBtn onClick={handleOpen}>
        创建应用
      </SecondaryBtn>
      <Dialog
        open={open} onClose={handleClose}
        TransitionComponent={DialogTransition}
        fullWidth maxWidth={'ll'}
        sx={{
          zIndex: 1009,
        }}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
          }
        }}
      >
        <CreateApp
          onCancel={handleClose}
          onCreate={onCreate}
        />
      </Dialog>
    </>
  )
}

export default Create
