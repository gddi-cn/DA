import { currentUserAtom } from '@src/store/user'
import { Box, Skeleton, Typography } from '@mui/material'
import { useAtomValue } from 'jotai'
import React from 'react'

const Name: React.FC = () => {
  const userInfo = useAtomValue(currentUserAtom)
  const { username } = userInfo || { name: '--' }

  return (
    <Typography
      variant='body1' component='span' noWrap
      sx={{
        fontSize: '14px',
        fontWeight: 400,
      }}
    >
      {username}
    </Typography>
  )
}

const Fallback: React.FC = () => {
  return (
    <Skeleton width={200} height={30} />
  )
}

const Username: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '20px',
        height: '30px',
      }}
    >
      <Typography
        variant='body1' component='span' noWrap
        sx={{
          width: 45,
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        用户名
      </Typography>
      <React.Suspense fallback={<Fallback />}>
        <Name />
      </React.Suspense>
    </Box>
  )
}

export default Username

