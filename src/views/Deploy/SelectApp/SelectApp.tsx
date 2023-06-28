import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import { useAppList, useSelectApp } from './hook'
import Empty from './Empty'
import AppCard from '@src/components/AppCard'
import CreateApp from '@src/components/CreateApp'

const AppList: React.FC = () => {
  const {
    appList,
    empty,
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
                  display: 'grid',
                  gridTemplate: 'auto/repeat(auto-fit, minmax(276px, 1fr)) ',
                  gap: '20px',
                  width: 1164,
                  margin: 'auto',
                }}
              >
                {
                  appList.map(app => (
                    <AppCard
                      {...app}
                      key={app.id}
                      mutiple
                    />
                  ))
                }
              </Box>
          </Scrollbars>
        )
      }
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
