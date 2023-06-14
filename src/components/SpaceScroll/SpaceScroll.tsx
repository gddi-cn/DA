import { Box } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

const SpaceScroll: React.FC<{ children: React.ReactNode }> = (
  {
    children,
  }
) => {
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Scrollbars autoHide>
        <Box sx={{
          py: '20px', pr: '38px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          { children }
        </Box>
      </Scrollbars>
    </Box>
  )
}

export default SpaceScroll
