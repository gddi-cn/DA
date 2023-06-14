import { Box } from '@mui/material'
import React from 'react'

import Dashboard from './components/Dashboard'
import Info from './components/Info'
import Consumes from './components/Consumes'
import SpaceScroll from '@src/components/SpaceScroll/SpaceScroll'


const Account: React.FC = () => {
  return (
    <SpaceScroll>
      <Box
        sx={{
          display: 'grid',
          gridTemplate: {
            ll: `
                "dashboard info" auto
                "record record" auto / 2fr 1fr
              `,
            xs: `
              "dashboard" auto
              "info" auto
              "record" auto / 1fr
            `
          },
          gap: '20px',
        }}
      >
        <Box sx={{ gridArea: 'dashboard' }}>
          <Dashboard />
        </Box>
        <Box sx={{ gridArea: 'info' }}>
          <Info />
        </Box>
        <Box sx={{ gridArea: 'record' }}>
          <Consumes />
        </Box>
      </Box>
    </SpaceScroll>
  )
}

export default Account
