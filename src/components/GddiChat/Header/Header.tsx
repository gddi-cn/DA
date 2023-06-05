import React from 'react'
import { Box, styled } from '@mui/material'

import logo from './logo.svg'

const Logo = styled('img')`
  width: 104px;
  height: 40px;
  display: block;
  object-fit: contain;
`

const Title = styled('h1')`
  font-weight: 600;
  color: #2582c1;
  font-size: 30px;
  margin: 0;
`

const Powered = styled('p')`
  font-weight: 600;
  color: #2582c1;
  font-size: 14px;
  margin: 0;
`

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '10px',
      }}
    >
      <Logo src={logo} alt='gddi logo' />
      <Title>欢迎使用共达地机器人</Title>
      <Powered>Powered by OpenAI</Powered>
    </Box>
  )
}

export default Header

