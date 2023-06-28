import { Box } from '@mui/material'
import React from 'react'
import Step from './Step'

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        py: '18px',
        margin: 'auto',
      }}
    >
      <Step />
    </Box>
  )
}

export default Header
