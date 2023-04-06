import React from 'react'
import { useAtomValue } from "jotai"

import { message } from 'antd'
import systemAPI from '@src/apis/system'
import { useRefreshTerminalDevice } from '../hook'
import { selectedTerminalDeviceIdListAtom } from '../../store'

export const useProcess = () => {
  const selectedDeviceIdList = useAtomValue(selectedTerminalDeviceIdListAtom)
  const [process, setProcess] = React.useState<number>(1)
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const idList = selectedDeviceIdList.map(id => id + '')

  const refresh = useRefreshTerminalDevice()

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
    loading,
    process,
    handleChange,
    open,
    handleCancel,
    handleUpdate,
    handleOpen,
  }
}

