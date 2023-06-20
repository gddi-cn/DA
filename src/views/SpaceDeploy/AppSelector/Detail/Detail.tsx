import { useAtom } from 'jotai'
import React from 'react'
import { currentAppIdAtom, detailOpenAtom } from '../store'
import AppDetail from '@src/components/AppDetail'
import { useRefreshAppList } from '../List/hook'
import { Dialog } from '@mui/material'

const useDetail = () => {
  const [open, setOpen] = useAtom(detailOpenAtom)
  const [currentAppId, setCurrentAppId] = useAtom(currentAppIdAtom)
  const refreshAppList = useRefreshAppList()

  const handleClose = () => {
    setOpen(false)
    refreshAppList()
    setTimeout(() => {
      setCurrentAppId(undefined)
    });
  }

  return {
    open,
    currentAppId,
    handleClose,
  }
}

const Detail: React.FC = () => {
  const {
    open,
    currentAppId,
    handleClose,
  } = useDetail()

  if (!currentAppId) return null

  return (
    <Dialog
      open={open && Boolean(currentAppId)}
      onClose={handleClose}
      fullWidth maxWidth={'ll'}
      PaperProps={{
        sx: {
          background: theme => theme.palette.blue.main,
          outline: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          height: '97vh',
        }
      }}
    >
      <AppDetail
        id={currentAppId}
        onClose={handleClose}
      />
    </Dialog>
  )
}

export default Detail
