
import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import Btn, { LoadingBtn } from '@src/components/Btn'
import { groupSelectorRefAtom, refreshDeviceListDataAtom, selectedDeviceGroupAtom, selectedDeviceIdListAtom } from '../store'
import { Fade, Dialog, DialogTitle, DialogActions, DialogContent, Box } from '@mui/material'
import DialogTransition from '@src/components/DialogTransition'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import GroupSelector from '@src/components/GroupSelector/GroupSelector'

import unregister from '@src/asset/images/space/unregister.png'
import styled from 'styled-components'
import FormItem from 'antd/es/form/FormItem'
import { Form, message } from 'antd'
import deviceGroupAPI from '@src/apis/deviceGroups'

const Img = styled.img`
  display: block;
  width: 256px;
  height: 200px;
  object-fit: contain;
`

const useMoveDevice = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [targetGroup, setTargetGroup] = React.useState<DeviceGroupOptions | null>(null)
  const targetGroupId = targetGroup?.key
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  const sourceGroup = useAtomValue(selectedDeviceGroupAtom)
  const sourceGroupId = sourceGroup?.key
  const show = selectedDeviceIdList.length > 0
  const refresh = useSetAtom(refreshDeviceListDataAtom)
  const ref = useAtomValue(groupSelectorRefAtom)

  const handleOpen = () => {
    show && setOpen(true)
  }

  const handleClose = () => {
    loading || setOpen(false)
  }

  const handleChange = (group: DeviceGroupOptions | null) => {
    loading || setTargetGroup(group)
  }

  const handleMove = () => {
    if (loading) return;
    if (!selectedDeviceIdList.length) return;
    if (
      (sourceGroupId !== 0 && !sourceGroupId)
    )
      return;

    if (targetGroupId !== 0 && !targetGroupId) {
      message.warn('请选择要添加到的分组')
      return
    }

    setLoading(true);
    Promise.all(
      selectedDeviceIdList.map((id) =>
        deviceGroupAPI.copyDevice(id, sourceGroupId, targetGroupId)
      )
    ).then((resList) => {
      setLoading(false);
      const success = resList.every((x) => x.success);

      if (success) {
        message.success("添加成功");
        setOpen(false)
        ref?.current?.refresh()
      }

      refresh();
    });
  }

  return {
    show,
    open,
    loading,
    targetGroup,
    handleOpen,
    handleClose,
    handleChange,
    handleMove,
  }
}

const CopyDevice: React.FC = () => {
  const {
    show,
    open,
    loading,
    targetGroup,
    handleOpen,
    handleClose,
    handleChange,
    handleMove,
  } = useMoveDevice()

  if (!show) return null

  return (
    <>
      <Fade in>
        <Btn
          sx={{ width: 132 }}
          variant='outlined'
          color='black'
          size='small'
          onClick={handleOpen}
        >
          添加到组
        </Btn>
      </Fade>
      <Dialog
        open={open && show} onClose={handleClose}
        fullWidth maxWidth='md'
        TransitionComponent={DialogTransition}
        sx={{
          zIndex: 1009,
        }}
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
          添加到组
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              pt: '40px',
              pb: '132px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '40px',
            }}
          >
            <Form layout='vertical'>
              <FormItem
                label='选择分组'
                required
              >
                <GroupSelector
                  value={targetGroup}
                  onChange={handleChange}
                  width={436}
                  selectDefault
                />
              </FormItem>
            </Form>
            <Img src={unregister} alt='move device' />
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
            color='black'
            sx={{ width: 97 }} size='small'
            onClick={handleMove}
          >
            确定
          </LoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CopyDevice
