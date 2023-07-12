import { Box, CircularProgress, Dialog, Button } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import AddIcon from '@mui/icons-material/Add'

import { useAppList, useSelectApp, useDetail } from './hook'
import Empty from './Empty'
import AppCard from '@src/components/AppCard'
import CreateApp from '@src/components/CreateApp'
import AppDetail from '@src/components/AppDetail'

const Detail: React.FC = () => {
  const {
    open,
    currentAppId,
    handleClose,
  } = useDetail()

  if (!currentAppId) return null
  console.log({ handleClose })

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
        key={currentAppId}
        id={currentAppId}
        onClose={handleClose}
        onDelete={handleClose}
      />
    </Dialog>
  )
}

const AppList: React.FC = () => {
  const {
    appList,
    empty,
    isSelected,
    handleSelectChange,
    handleDetail,
    handleOpenCreate,
  } = useAppList()

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      {
        empty ? (
          <Empty />
        ) : (
          <Scrollbars autoHide>
            <Box
              sx={{
                padding: '10px 0 20px',
                display: 'grid',
                gridTemplate: 'auto/repeat(auto-fit, minmax(276px, 276px)) ',
                gap: '20px',
                width: 1164,
                margin: 'auto',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  bgcolor: theme => theme.palette.blue.main,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '4px',
                }}
              >
                <Button
                  variant='outlined' sx={{ borderRadius: '36.5px' }}
                  onClick={handleOpenCreate}
                >
                  <AddIcon />
                  创建新应用
                </Button>
              </Box>
              {
                appList.map(app => (
                  <AppCard
                    {...app}
                    key={app.id}
                    selected={isSelected(app.id)}
                    onSelectedChange={handleSelectChange}
                    onDetail={handleDetail}
                  />
                ))
              }
            </Box>
          </Scrollbars>
        )
      }
      <Detail />
    </Box>
  )
}

const Fallback: React.FC = () => {
  return (
    <Box mt={4} sx={{ display: 'grid', placeItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

const SelectApp: React.FC = () => {
  const {
    open,
    modelVersionId,
    handleClose,
  } = useSelectApp()

  return (
    <>
      <React.Suspense fallback={<Fallback />}>
        <AppList />
      </React.Suspense>
      <CreateApp
        open={open}
        modelIterId={modelVersionId}
        onCancel={handleClose}
        onCreate={handleClose}
      />
    </>
  )
}

export default SelectApp
