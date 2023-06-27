import { Tabs, Tab, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { SecondaryBtn } from '../Btn'
import DialogTransition from '../DialogTransition'
import Cloud from './Cloud'
import Device from './Device'

export enum AuthRecordTab {
  DEVICE = 'device',
  CLOUD = 'cloud',
}

export interface AuthRecordProps {
  open: boolean
  defaultTab?: AuthRecordTab
  onClose?: () => void
}

const useAuthRecord = ({
  open,
  defaultTab = AuthRecordTab.DEVICE,
  onClose,
}: AuthRecordProps) => {
  const [currentTab, setCurrentTab] = React.useState<AuthRecordTab>(defaultTab)

  const handleClose = () => {
    onClose?.()
  }

  const handleTabChange = (tab: AuthRecordTab) => {
    setCurrentTab(tab)
  }

  React.useEffect(
    () => {
      setCurrentTab(defaultTab)
    },
    [defaultTab]
  )

  React.useEffect(
    () => {
      if (open) return
      setCurrentTab(defaultTab)
    },
    [open]
  )

  return {
    open,
    currentTab,
    handleClose,
    handleTabChange,
  }
}

const AuthRecord: React.FC<AuthRecordProps> = (props) => {
  const {
    open,
    currentTab,
    handleClose,
    handleTabChange,
  } = useAuthRecord(props)

  return (
    <Dialog
      open={open} onClose={handleClose}
      fullWidth maxWidth={'ll'}
      TransitionComponent={DialogTransition}
      PaperProps={{
        sx: {
          background: theme => theme.palette.blue.main,
          outline: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          p: '40px 40px 16px',
          height: '97vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          p: 0,
        }}
      >
        授权记录
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          px: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={(_, v) => handleTabChange(v)}
        >
          <Tab value={AuthRecordTab.DEVICE} label='设备授权' />
          <Tab value={AuthRecordTab.CLOUD} label='云授权' />
        </Tabs>
        <Box
          sx={{
            flex: 1,
            mt: 2,
          }}
        >
          {
            currentTab === AuthRecordTab.DEVICE ? (
              <Device />
            ) : null
          }
          {
            currentTab === AuthRecordTab.CLOUD ? (
              <Cloud />
            ) : null
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <SecondaryBtn onClick={handleClose}>关闭</SecondaryBtn>
      </DialogActions>
    </Dialog>
  )
}

export default AuthRecord

