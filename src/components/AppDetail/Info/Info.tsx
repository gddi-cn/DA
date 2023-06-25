import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Meta from './Meta'
import Config from './Config'
import Deploy from './Deploy'

import { useInfo } from './hook'
import { Box } from '@mui/material'
import Scrollbars from 'react-custom-scrollbars'
import { SecondaryBtn } from '@src/components/Btn'

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
  padding: 40px;
  align-self: stretch;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Info: React.FC = () => {
  const { handleClose } = useInfo()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Title>应用详情</Title>
      <Box sx={{ flexGrow: 1 }}>
        <Scrollbars autoHide>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box width={700}>
              <Header />
              <Meta />
              <Config />
              <Deploy />
            </Box>
          </Box>
        </Scrollbars>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '20px 40px',
        }}
      >
        <SecondaryBtn onClick={handleClose}>关闭</SecondaryBtn>
      </Box>
    </Box>
  )
}

export default Info

