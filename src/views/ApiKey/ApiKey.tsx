import { Box, Typography } from '@mui/material';
import React from 'react';

import Actions from './Actions'
import APIKeyList from './APIKeyList'
import Footer from './Footer';
import Scrollbars from 'react-custom-scrollbars';

const ApiKey: React.FC = () => {
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: '20px',
            }}
          >
            <Typography variant="subtitle1" component={'h5'} color='primary' fontWeight={'bold'}>
              API Key 管理
            </Typography>
            <Actions />
          </Box>
          <Box flex={1}>
            <Scrollbars>
              <Box px='20px'>
                <APIKeyList />
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

export default ApiKey
