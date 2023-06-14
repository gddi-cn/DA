import { Box } from '@mui/material'
import React from 'react'

import Dashboard from './components/Dashboard'
import Info from './components/Info'
import Consumes from './components/Consumes'


const Account: React.FC = () => {
  return (
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
  )
}

export default Account
