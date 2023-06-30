import React from 'react'
import { Box, Typography } from '@mui/material'

import GenCode from '@src/components/GenCode'
import DeviceRegister from '@src/components/DeviceRegister'
import { useAtomValue } from 'jotai'
import { selectedDeviceGroupAtom, selectedDeviceIdListAtom } from '../store'
import { useRefreshDeviceList } from './hook'

const Register: React.FC = () => {
  const selectedDeviceGroupOption = useAtomValue(selectedDeviceGroupAtom)
  const refresh = useRefreshDeviceList()
  return (
    <DeviceRegister
      primary
      getDefaultGroup={() => selectedDeviceGroupOption}
      onRegist={refresh}
    />
  )
}

const SelectedNum: React.FC = () => {
  const selectedDevice = useAtomValue(selectedDeviceIdListAtom)
  const num = selectedDevice?.length ?? 0

  return (
    <Typography
      sx={{
        color: '#62b0e5',
        fontSize: '14px',
      }}
    >
      已选设备： {num}
    </Typography>
  )
}

const Header: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ color: '#202223', fontSize: '18px', fontWeight: 600 }}
        >
          设备列表
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px',
          }}
        >
          <Register />
          <GenCode />
        </Box>
      </Box>
      <Box mt={'10px'}>
        <SelectedNum />
      </Box>
    </>
  )
}

export default Header
