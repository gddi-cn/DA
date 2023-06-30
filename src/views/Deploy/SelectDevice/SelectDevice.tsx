import { Box } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import SelectedApp from './SelectedApp'
import ChipType from './ChipType'
import DeviceGroup from './DeviceGroup'
import Header from './Header'
import DeviceList from './DeviceList'

const SelectDevice: React.FC = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Scrollbars autoHide>
        <Box
          sx={{
            height: '100%',
            width: 1164,
            display: 'grid',
            gap: '20px',
            margin: 'auto',
            padding: '10px 0 20px',
            gridTemplate: `
              "app device" 237px
              "chip device" 125px
              "group device" 113px
              ". device" auto / 208px 1fr
            `
          }}
        >
          <Box sx={{ bgcolor: 'blue.main', gridArea: 'app', borderRadius: '8px' }}>
            <SelectedApp />
          </Box>
          <Box sx={{ bgcolor: 'blue.main', gridArea: 'chip', borderRadius: '8px' }}>
            <ChipType />
          </Box>
          <Box sx={{ bgcolor: 'blue.main', gridArea: 'group', borderRadius: '8px' }}>
            <DeviceGroup />
          </Box>
          <Box
            sx={{
              bgcolor: 'blue.main',
              gridArea: 'device',
              borderRadius: '8px',
              p: '10px',
            }}
          >
            <Box
              sx={{
                height: '100%',
                bgcolor: 'white.main',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                p: '20px',
              }}
            >
              <Header />
              <DeviceList />
            </Box>
          </Box>
        </Box>
      </Scrollbars>
    </Box>
  )
}

export default SelectDevice
