
import React from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import Btn, { LoadingBtn } from '@src/components/Btn'
import { deviceListTotalAtom, groupSelectorRefAtom, refreshDeviceListDataAtom, selectedDeviceGroupAtom, selectedDeviceIdListAtom } from '../store'
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

const useDeleteGroup = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const total = useAtomValue(deviceListTotalAtom)
  const [groupOption, setGroupOption] = useAtom(selectedDeviceGroupAtom)
  const groupId = groupOption?.key;
  const show = Boolean(groupId) && total <= 0

  const ref = useAtomValue(groupSelectorRefAtom)

  const handleOpen = () => {
    show && setOpen(true)
  }

  const handleClose = () => {
    loading || setOpen(false)
  }

  const handleDeleteGroup = async () => {
    if (loading) return;
    if (!groupId) return;

    setLoading(true);
    const { success } = await deviceGroupAPI.delete(groupId);
    setLoading(false);

    ref?.current?.refresh()

    if (success) {
      message.success("删除成功");
    }

    setGroupOption({ key: 0, value: 0, label: "默认组" });
  }

  return {
    show,
    open,
    loading,
    handleOpen,
    handleClose,
    handleDeleteGroup,
  }
}

const DeleteGroup: React.FC = () => {
  const {
    show,
    open,
    loading,
    handleOpen,
    handleClose,
    handleDeleteGroup,
  } = useDeleteGroup()

  return show ? (
    <>
      <Btn
        sx={{ width: 132 }}
        variant='outlined'
        size='small'
        onClick={handleOpen}
        color='error'
      >
        删除分组
      </Btn>
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
          删除分组
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
            <Img src={unregister} alt={'deleteGroup'} />
            <Title>删除分组</Title>
            <Tip>分组删除后将无法撤销，您确定要删除吗？</Tip>
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
            onClick={handleDeleteGroup}
          >
            删除
          </LoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  ) : null
}

export default DeleteGroup
