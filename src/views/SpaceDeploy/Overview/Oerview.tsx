import React from 'react'
import { Box, Typography } from '@mui/material'
import Scrollbars from 'react-custom-scrollbars'

import Config from './Config'
import AppList from './AppList'
import DeviceList from './DeviceList'
import Footer from './Footer'

const Overview: React.FC = () => {
  return (
    <Box
      sx={{
        py: '20px', pr: '38px',
        height: '100%', overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          bgcolor: 'white.main',
          borderRadius: '8px',
          height: '100%',
          py: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            height: '100%'
          }}
        >
          <Box sx={{ px: '20px' }}>
            <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
              总览
            </Typography>
          </Box>
          <Box flexGrow={1}>
            <Scrollbars>
              <Box sx={{ px: '20px' }}>
                <Config />
                <AppList />
                <DeviceList />
              </Box>
            </Scrollbars>
          </Box>
          <Box px='20px'>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Overview
