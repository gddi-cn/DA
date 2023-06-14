
import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import Btn, { LoadingBtn } from '@src/components/Btn'
import { refreshDeviceListDataAtom, selectedDeviceGroupAtom, selectedDeviceIdListAtom } from '../store'
import { Fade, Dialog, DialogTitle, DialogActions, DialogContent, Box } from '@mui/material'
import DialogTransition from '@src/components/DialogTransition'

import unregister from '@src/asset/images/space/unregister.png'
import styled from 'styled-components'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { message } from 'antd'

const Img = styled.img`
  display: block;
  width: 357px;
  height: 200px;
  object-fit: contain;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #FF6177;
  margin-top: 40px;
`

const Tip = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #061926;
  margin-top: 10px;
`

const useUnregister = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  const show = selectedDeviceIdList.length > 0
  const sourceGroup = useAtomValue(selectedDeviceGroupAtom)
  const groupId = sourceGroup?.key

  const refresh = useSetAtom(refreshDeviceListDataAtom)

  const handleOpen = () => {
    show && setOpen(true)
  }

  const handleClose = () => {
    loading || setOpen(false)
  }

  const handleUnregister = () => {
    if (loading) return;
    if (groupId !== 0 && !groupId) return;
    if (!selectedDeviceIdList.length) return;

    setLoading(true);
    Promise.all(
      selectedDeviceIdList.map((id) => deviceGroupAPI.unregister(id, groupId))
    ).then((resList) => {
      setLoading(false);
      const success = resList.every((x) => x.success);

      if (success) {
        message.success("注销成功");
      }

      setOpen(false)
      refresh();
    });
  }

  return {
    show,
    open,
    loading,
    handleOpen,
    handleClose,
    handleUnregister,
  }
}

const Unregister: React.FC = () => {
  const {
    show,
    open,
    loading,
    handleOpen,
    handleClose,
    handleUnregister,
  } = useUnregister()

  if (!show) return null

  return (
    <>
      <Fade in>
        <Btn
          sx={{ width: 132 }}
          variant='outlined'
          size='small'
          onClick={handleOpen}
          color='error'
        >
          注销
        </Btn>
      </Fade>
      <Dialog
        open={open && show} onClose={handleClose}
        fullWidth maxWidth='md'
        TransitionComponent={DialogTransition}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            p: '40px 40px 16px',
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
          注销设备
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              py: '60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Img src={unregister} alt={'unregister'} />
            <Title>注销设备</Title>
            <Tip>设备注销后将<strong>无法撤销</strong>，您确定要注销吗？</Tip>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
          <Btn
            onClick={handleClose} disabled={loading}
            variant='outlined' color='black'
            sx={{ width: 97 }} size='small'
          >
            取消
          </Btn>
          <LoadingBtn
            loading={loading}
            variant='contained'
            color='error'
            sx={{ width: 97 }} size='small'
            onClick={handleUnregister}
          >
            注销
          </LoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Unregister
