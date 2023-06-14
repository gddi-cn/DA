import React from 'react'
import { Box, Container, Typography, styled } from '@mui/material'

import Nav from './components/Nav'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { Paths } from '@src/shared/enum/paths'

const Wrap = styled(Box)`
  height: calc(100vh - 50px);
  background-color: #f5f5f5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled(Box)`
  height: 48px;
  background-color: #fff;
  display: grid;
  place-items: center;
`

const Content = styled(Container)`
  flex-grow: 1;
  /* padding: 20px 0 20px 38px; */
  display: flex;
  column-gap: 56px;
  align-items: stretch;
`

const useSpace = () => {
  const match = useMatch(Paths.Layout.SPACE)
  const navigate = useNavigate()

  React.useEffect(
    () => {
      if (!match) return
      navigate(Paths.Space.ACCOUNT)
    },
    [match]
  )
}

const Space: React.FC = () => {
  useSpace()

  return (
    <Wrap>
      <Header>
        <Typography variant="h6" component={'h2'}>个人中心</Typography>
      </Header>
      <Content maxWidth='hd' disableGutters>
        <Box sx={{ pl: '38px', py: '20px' }}>
          <Nav />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Content>
    </Wrap>
  )
}

export default Space

