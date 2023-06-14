import React from 'react'
import { Box } from '@mui/material'

import MoveDevice from './MoveDevice'
import CopyDevice from './CopyDevice'
import Process from './Process'
import Unregister from './Unregister'
import DeleteGroup from './DeleteGroup'

const Actions: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '20px',
      }}
    >
      <MoveDevice />
      <CopyDevice />
      <Process />
      <Unregister />
      <DeleteGroup />
    </Box>
  )
}

export default Actions

