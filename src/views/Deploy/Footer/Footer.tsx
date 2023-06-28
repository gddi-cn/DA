import React from 'react'
import { Box } from '@mui/material'

import Cancel from './Cancel'
import { useAtomValue } from 'jotai'
import { currentStepAtom } from '../store'
import { Deploy } from '../enums'
import Cloud from './Cloud'
import Device from './Device'

const Actions: React.FC = () => {
  const currentStep = useAtomValue(currentStepAtom)

  if (currentStep === Deploy.Step.SELECT_APP) {
    return (
      <Box
        display={'flex'}
        alignItems='center'
        columnGap={'20px'}
      >
        <Cloud />
        <Device />
      </Box>
    )
  }

  return null
}

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '8px 58px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #EDF8FF',
      }}
    >
      <Cancel />
      <Actions />
    </Box>
  )
}

export default Footer
