import { Box, Typography } from '@mui/material'
import React from 'react'

export interface ProgressProps {
  value: number
  total: number
  name: string
  unit: string
  infinity?: boolean
  bgcolor?: React.CSSProperties['backgroundColor']
  activeBgcolor?: React.CSSProperties['backgroundColor']
}

const Progress: React.FC<ProgressProps> = (
  {
    value,
    total,
    name,
    unit,
    infinity = false,
    bgcolor = '#97caec',
    activeBgcolor = '#48a2df',
  }
) => {
  const percent = infinity ? 0 : Math.min(Math.floor(((value / total) * 100)), 100)
  const statistics = `${value} / ${infinity ? '无限制' : total} ${unit}`

  return (
    <Box>
      <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
        {name}
      </Typography>
      <Box
        sx={{
          height: '10px',
          borderRadius: '5px',
          backgroundColor: bgcolor,
          margin: '4px 0',
          '&:before': {
            content: '""',
            display: 'block',
            height: '100%',
            borderRadius: '5px',
            backgroundColor: activeBgcolor,
            width: `${percent}%`,
          }
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ fontSize: '12px', color: activeBgcolor, fontWeight: 400 }}>
          {statistics}
        </Typography>
        <Typography sx={{ fontSize: '12px', color: activeBgcolor, fontWeight: 400 }}>
          {percent}%
        </Typography>
      </Box>
    </Box>
  )
}

export default Progress
