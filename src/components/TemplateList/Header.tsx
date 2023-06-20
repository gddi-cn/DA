import React from 'react'
import styled from 'styled-components'
import { Box } from '@mui/material'

import NameFilter from './NameFilter'
import TemplateLabelFilter from './TemplateLabelFilter'
import InputFilter from './InputFilter'
import CreateTemplate from '../CreateTemplate'

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding: 0 40px;
`

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
        }}
      >
        <NameFilter />
        <TemplateLabelFilter />
        <InputFilter />
      </Box>
      <CreateTemplate />
    </Box>
  )
}

export default Header

