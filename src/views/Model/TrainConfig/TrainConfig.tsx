import React from 'react'
import Box from "@mui/material/Box";

import SelectChip from './SelectChip'
import Setting from './Setting'
import Footer from './Footer'
import {useTrainConfig} from "./hook";

const TrainConfig: React.FC = () => {
  const { step } = useTrainConfig()

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {
          step === 'chip' ? <SelectChip /> : null
        }
        {
          step === 'config' ? <Setting /> : null
        }
      </Box>
      <Footer />
    </Box>
  )
}

export default TrainConfig
