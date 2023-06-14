import { Box } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import Header from './Header'
import List from './List'
import Footer from './Footer'

const DeviceSelector: React.FC = () => {
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
            <Header />
          </Box>
          <Box flexGrow={1}>
            <Scrollbars>
              <Box sx={{ px: '20px' }}>
                <List />
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

export default DeviceSelector
