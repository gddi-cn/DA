import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@mui/material/CircularProgress'
import { Typography } from '@mui/material'

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
`

const Pending: React.FC = () => {
  return (
    <Container>
      <CircularProgress size={70} />
      <Typography variant='h5'>等待资源释放，训练排队中</Typography>
    </Container>
  )
}

export default Pending
