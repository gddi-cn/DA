import { Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import DaySelector, { DaySelectorRef } from '../DaySelector'
import { SecondaryBtn, PrimaryLoadingBtn } from '@src/components/Btn'
import { ApplyModel } from '@src/shared/types/license'
import { LicenseType } from '@src/shared/enum/license'
import DialogTransition from '../DialogTransition'
import cloudAuthAPI from '@src/apis/cloudAuth'
import { message } from 'antd'

export interface CloudAuthProps {
  open: boolean
  appIds: Array<CloudAuth.Instance['app_id']>
  onClose?: () => void
  onAuth?: () => void
}

const useCloudAuth = ({ open, onClose, onAuth, appIds }: CloudAuthProps) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const formRef = React.useRef<DaySelectorRef>(null)

  const handleClose = () => {
    onClose?.()
  }

  const handleAuth = async () => {
    if (loading) return

    const form = formRef.current
    if (!form) return

    try {
      setLoading(true)
      const { day, custom } = await form.form.validateFields()
      if (!appIds.length) return
      if (day === 0 && !custom) return

      const request_days = day === 0 ? custom! : day

      const res = await Promise.all(appIds.map((app_id) => cloudAuthAPI.create({
        app_id,
        request_days,
      })))

      const success = res.every(x => x.success)

      if (!success) return

      message.success('申请成功')

      onAuth?.()
    } catch (_) {
      return
    } finally {
      setLoading(false)
    }
  }

  return {
    open,
    loading,
    formRef,
    handleClose,
    handleAuth,
  }
}

const CloudAuth: React.FC<CloudAuthProps> = (props) => {
  const {
    open,
    loading,
    formRef,
    handleClose,
    handleAuth,
  } = useCloudAuth(props)

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
        云授权
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          px: 0,
        }}
      >
        <Scrollbars autoHide>
          <Box px={2}>
            <DaySelector ref={formRef} />
          </Box>
        </Scrollbars>
      </DialogContent>
      <DialogActions>
        <SecondaryBtn onClick={handleClose}>取消</SecondaryBtn>
        <PrimaryLoadingBtn loading={loading} onClick={handleAuth}>
          授权
        </PrimaryLoadingBtn>
      </DialogActions>
    </Dialog >
  )
}

export default CloudAuth

