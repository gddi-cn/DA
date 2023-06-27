import { useAtom } from 'jotai'
import React from 'react'
import { selectedAppListAtom } from '../../store'
import { Fade } from '@mui/material'
import { Box } from '@mui/material'
import { SecondaryBtn, PrimaryBtn } from '@src/components/Btn'
import { useToDevice } from '../../hook'
import CloudDeploy from './CloudDeploy'

const Footer: React.FC = () => {
  const [selectedAppList, setSelectedAppList] = useAtom(selectedAppListAtom)
  const toDevice = useToDevice()

  const handleDevice = () => {
    if (!selectedAppList.length) return
    toDevice()
  }

  return (
    <Fade in={selectedAppList.length > 0}>
      <Box
        sx={{
          bgcolor: 'white.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: '10px',
        }}
      >
        <SecondaryBtn onClick={() => setSelectedAppList([])}>
          取消选择
        </SecondaryBtn>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '20px',
          }}
        >
          <CloudDeploy />
          <PrimaryBtn onClick={handleDevice}>设备授权</PrimaryBtn>
        </Box>
      </Box>
    </Fade>
  )
}

export default Footer
