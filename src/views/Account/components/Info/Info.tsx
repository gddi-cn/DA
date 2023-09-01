import { Box, Typography } from '@mui/material'
import React from 'react'

import UserAvatar from './UserAvatar'
import Username from './Username'
import Nickname from './Nickname'
import Email from './Email'
import UpdatePwd from './UpdatePwd'
import {currentUserAtom} from "@src/store/user";
import {useSetAtom} from "jotai";

const useInfo = () => {
  const refreshUser = useSetAtom(currentUserAtom)

  React.useEffect(
    () => {
      refreshUser()
    },
    []
  )
}

const Info: React.FC = () => {
  useInfo()

  return (
    <Box
      sx={{
        bgcolor: 'blue.main',
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
      }}
    >
      <Typography variant='subtitle1' component='h5' fontWeight={'bold'}>
        用户信息
      </Typography>
      <UserAvatar />
      <Username />
      <Nickname />
      <Email />
      <UpdatePwd />
    </Box>
  )
}

export default Info

