import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import { currentAppIdAtom, defaultPageAtom, detailOpenAtom } from '../store'
import AppDetail from '@src/components/AppDetail'
import { useRefreshAppList } from '../List/hook'
import { Dialog } from '@mui/material'
import { selectedAppListAtom } from '../../store'

const useDetail = () => {
  const [open, setOpen] = useAtom(detailOpenAtom)
  const [currentAppId, setCurrentAppId] = useAtom(currentAppIdAtom)
  const [defaultPage, setDefaultPage] = useAtom(defaultPageAtom)
  const refreshAppList = useRefreshAppList()
  const setSelectedAppList = useSetAtom(selectedAppListAtom)

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      refreshAppList()
      setDefaultPage()
      setCurrentAppId(undefined)
    });
  }

  const handleDelete = () => {
    handleClose()
    setSelectedAppList(prev => prev.filter(app => app.id !== currentAppId))
  }

  return {
    open,
    currentAppId,
    defaultPage,
    handleClose,
    handleDelete,
  }
}

const Detail: React.FC = () => {
  const {
    open,
    currentAppId,
    defaultPage,
    handleClose,
    handleDelete,
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
      sx={{
        zIndex: 999,
      }}
    >
      <AppDetail
        id={currentAppId}
        onClose={handleClose}
        defaultPage={defaultPage}
        onDelete={handleDelete}
      />
    </Dialog>
  )
}

export default Detail
