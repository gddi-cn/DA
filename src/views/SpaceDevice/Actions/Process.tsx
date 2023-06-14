
import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import Btn, { LoadingBtn } from '@src/components/Btn'
import { refreshDeviceListDataAtom, selectedDeviceIdListAtom } from '../store'
import { Fade, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import DialogTransition from '@src/components/DialogTransition'
import { InputNumber, message } from 'antd'
import systemAPI from '@src/apis/system'
import styled from 'styled-components'

// import moveDevice from '@src/asset/images/space/moveDevice.png'
const Label = styled.label`
  
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 90px 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
  column-gap: 16px;
`

export const useProcess = () => {
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  const [process, setProcess] = React.useState<number>(1)
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const idList = selectedDeviceIdList.map(id => id + '')
  const show = selectedDeviceIdList.length > 0
  const inputRef = React.useRef<HTMLInputElement>(null)

  const refresh = useSetAtom(refreshDeviceListDataAtom)

  const handleChange = (value: number | null) => {
    if (value === null) {
      setProcess(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    setProcess(value)
  }

  const handleCancel = () => {
    if (loading) return
    setOpen(false)
    setProcess(1)
  }

  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus())
  }
  const handleUpdate = async () => {
    if (loading) return

    if (!process || process > 999 || process < 1) {
      message.warn('请输入正确的进程数')
      return
    }
    
    setLoading(true)
    const { success } = await systemAPI.updateDeviceLimit(idList, process)
    setLoading(false)

    if (!success) return

    message.success('修改成功')

    refresh()
  }

  return {
    inputRef,
    loading,
    show,
    process,
    open,
    handleChange,
    handleCancel,
    handleUpdate,
    handleOpen,
  }
}


const Process: React.FC = () => {
  const {
    inputRef,
    loading,
    show,
    process,
    open,
    handleChange,
    handleCancel,
    handleUpdate,
    handleOpen,
  } = useProcess()

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
          修改任务数限制
        </Btn>
      </Fade>
      <Dialog
        open={open && show} onClose={handleCancel}
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
          修改任务最大并发数限制
        </DialogTitle>
        <DialogContent>
          <Content>
            <Label>
              <span>最大并发数：</span>
              <InputNumber<number>
                value={process}
                onChange={handleChange}
                min={1}
                max={999}
                style={{ width: 300 }}
                autoFocus
                ref={inputRef}
              />
            </Label>
          </Content>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
          <Btn
            onClick={handleCancel} disabled={loading}
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
            onClick={handleUpdate}
          >
            确定
          </LoadingBtn>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Process
