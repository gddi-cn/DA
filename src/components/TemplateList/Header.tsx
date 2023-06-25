import React from 'react'
import { Box } from '@mui/material'

import NameFilter from './NameFilter'
import TemplateLabelFilter from './TemplateLabelFilter'
import InputFilter from './InputFilter'
import CreateTemplate from '../CreateTemplate'

interface HeaderProps {
  onTemplateCreateOpen?(): void
  onTemplateCreateClose?(): void
  onTemplateCreated?(): void
}

const Header: React.FC<HeaderProps> = (
  {
    onTemplateCreateOpen,
    onTemplateCreateClose,
    onTemplateCreated,
  }
) => {
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
      <CreateTemplate
        onOpen={onTemplateCreateOpen}
        onClose={onTemplateCreateClose}
        onCreated={onTemplateCreated}
      />
    </Box>
  )
}

export default Header

