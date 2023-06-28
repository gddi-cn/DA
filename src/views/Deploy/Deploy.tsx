import { Box } from '@mui/material'
import { Provider } from 'jotai'
import React from 'react'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Deploy: React.FC = () => {
  return (
      <Box
        height='calc(100vh - 100px)'
        display='flex'
        flexDirection='column'
        alignItems='stretch'
      >
        <Header />
        <Box flexGrow={1}>
          <Content />
        </Box>
        <Footer />
      </Box>
  )
}

export default Deploy
