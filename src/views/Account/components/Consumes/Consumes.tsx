import React from 'react'
import { Box, Typography } from '@mui/material'

import Filter from './Filter'
import Record from './Record'
import Footer from './Footer'

const Consumes: React.FC = () => {
  React.useEffect(
    () => {
      return () => {
        console.log('Consumes unmount')
      }
    },
    []
  )

  return (
    <Box
      sx={{
        bgcolor: 'white.main',
        p: '20px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
      }}
    >
      <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
        历史记录
      </Typography>
      <Filter />
      <Record />
      <Footer />
    </Box>
  )
}

export default Consumes

