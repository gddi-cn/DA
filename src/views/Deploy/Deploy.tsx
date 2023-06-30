import { Box } from '@mui/material'
import React from 'react'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Record from './Record'

import { useResetStore } from './store'

const Deploy: React.FC = () => {
  const resetStore = useResetStore()

  React.useEffect(
    () => () => resetStore(),
    []
  )

  return (
    <Box
      height='calc(100vh - 100px)'
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      position={'relative'}
    >
      <Header />
      <Box flexGrow={1}>
        <Content />
      </Box>
      <Footer />
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '30px',
        }}
      >
        <Record />
      </Box>
    </Box>
  )
}

export default Deploy
