import { Box, Typography } from '@mui/material';
import React from 'react';

import Actions from './Actions'
import APIKeyList from './APIKeyList'
import Footer from './Footer';

const ApiKey: React.FC = () => {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
          API Key 管理
        </Typography>
        <Actions />
      </Box>
      <APIKeyList />
      <Footer />
    </Box>
  )
}

export default ApiKey
