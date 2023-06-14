import React from 'react'
import { Box, Typography, styled } from '@mui/material'

import empty from '@src/asset/empty.png'

const Img = styled('img')`
  margin-top: 48px;
  display: block;
  width: 260px;
  height: 200px;
  object-fit: contain;
`

const Empty: React.FC<{ tip?: React.ReactNode }> = (
  {
    tip
  }
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 2,
      }}
    >
      <Img src={empty} alt='empty' />
      {
        tip ? tip : (
          <Typography
            variant='h6'
            component='p'
            sx={{
              mt: '40px',
            }}
          >
            暂无记录
          </Typography>
        )
      }
    </Box>
  )
}

export default Empty

