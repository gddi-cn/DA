import React from 'react'
import styled from 'styled-components'


import { useConfig } from './hook'
import GddiFlow from '@src/components/GddiFlow'
import {
  Dialog,
  IconButton, Box
} from '@mui/material'
import { SecondaryBtn, PrimaryBtn } from '@src/components/Btn'
import CloseIcon from '@mui/icons-material/Close'

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #2582C1;
  flex: 1;
`

const Config: React.FC<{ onClose?(): void }> = ({
  onClose,
}) => {
  const { handleBack, flowValue, appBaseInfo, init } = useConfig()

  return (
    <Dialog
      open={true}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: theme => theme.palette.blue.main,
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          jusitfyContent: 'space-between',
          py: 2,
          px: 3,
        }}
      >
        <Title>
          参数配置
        </Title>
        <IconButton onClick={onClose} size='small' color='primary'>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
      {
        init ? (
          <GddiFlow flowValue={{ ...flowValue }} appBaseInfo={{ ...appBaseInfo }} />
        ) : null
      }
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          columnGap: 2,
          padding: '20px 20px',
        }}
      >
        <SecondaryBtn onClick={handleBack}>返回详情</SecondaryBtn>
        <PrimaryBtn onClick={onClose}>确定</PrimaryBtn>
      </Box>
    </Dialog>
  )
}

export default Config

