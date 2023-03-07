import React from 'react'
import { useAtom } from 'jotai'
import produce from 'immer'
import { Form, UploadFile } from 'antd'

import {
  dialogOpenAtom,
  fetchingGroupDeviceAtom,
  groupDeviceAtom,
  groupDevicePageAtom,
  groupDevicePageSizeAtom,
  groupDeviceTotalAtom,
  registerResultAtom,
  selectedDeviceAtom,
  selectedDeviceGroupAtom,
  stepAtom
} from './store'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { GroupDevice } from '@src/shared/types/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import deviceAPI from '@src/apis/device'
import _ from 'lodash'
import { DeviceType } from '@src/shared/enum/device'


export const useResetApplyStore = () => {
  const [open] = useAtom(dialogOpenAtom)
  const [, setGroup] = useAtom(selectedDeviceGroupAtom)
  const [, setDeviceList] = useAtom(groupDeviceAtom)
  const [, setLoading] = useAtom(fetchingGroupDeviceAtom)
  const [, setTotal] = useAtom(groupDeviceTotalAtom)
  const [, setPage] = useAtom(groupDevicePageAtom)
  const [, setSelected] = useAtom(selectedDeviceAtom)
  const [, setStep] = useAtom(stepAtom)
  const [, setRes] = useAtom(registerResultAtom)
  const [, setPageSize] = useAtom(groupDevicePageSizeAtom)

  React.useEffect(
    () => {
      if (open) return

      setGroup(null)
      setDeviceList([])
      setLoading(false)
      setTotal(0)
      setPage(1)
      setPageSize(10)
      setSelected([])
      setStep('device')
      setRes([])
    },
    [open]
  )
}

export const useApply = () => {
  const [open, setOpen] = useAtom(dialogOpenAtom)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return {
    open,
    openDialog,
    closeDialog,
  }
}

export const useCheckAll = () => {
  const [selected, setSelected] = useAtom(selectedDeviceAtom)
  const [deviceList] = useAtom(groupDeviceAtom)

  const checkedAll =
    deviceList.filter(x => selected.includes(x.id)).length === deviceList.length

  const indeterminate =
    !checkedAll &&
    (selected.filter(s => deviceList.some(x => x.id === s)).length > 0)


  const handleToggle = () => {
    if (checkedAll) {
      setSelected(s => s.filter(id => !deviceList.some(x => x.id === id)))
    } else {
      setSelected(produce(draft => {
        draft.push(
          ...deviceList.map(x => x.id).filter(x => !draft.includes(x))
        )
      }))
    }
  }

  return {
    indeterminate,
    checkedAll,
    handleToggle,
  }
}

export const useSelect = (id: GroupDevice['id']) => {
  const [selected, setSelected] = useAtom(selectedDeviceAtom)

  const checked = selected.some(x => x === id)

  const handleToggle = () => {
    if (checked) {
      setSelected(s => s.filter(x => x !== id))
    } else {
      setSelected(produce(draft => {
        draft.push(id)
      }))
    }
  }

  return {
    checked,
    handleToggle,
  }
}

export const useRefreshGroupDevice = () => {
  const [group] = useAtom(selectedDeviceGroupAtom)
  const [, setDeviceList] = useAtom(groupDeviceAtom)
  const [loading, setLoading] = useAtom(fetchingGroupDeviceAtom)
  const [,setTotal] = useAtom(groupDeviceTotalAtom)
  const [page, setPage] = useAtom(groupDevicePageAtom)
  const [page_size] = useAtom(groupDevicePageSizeAtom)
  // const [, setSelected] = useAtom(selectedDeviceAtom)

  return async (firstPage = false) => {
    if (!(group?.value || group?.value === 0) || loading) return

    let type: DeviceType | undefined
    if (group.value === 0) {
      type = DeviceType.TERMINAL
    }

    setLoading (true)
    firstPage && setPage(1)
    const { success, data } = await deviceGroupAPI.fetchGroupDeviceList(
      group.value,
      { page: firstPage ? 1 : page, page_size, type }
    )
    setLoading(false)

    if (!success || !data) return
    const { items, total } = data

    setTotal(total || 0)
    setDeviceList(items || [])

    // setSelected(s => _.intersection((items || []).map(x => x.id), s))
  }
}

export const useGroupDevice = () => {
  const [group] = useAtom(selectedDeviceGroupAtom)
  const [deviceList] = useAtom(groupDeviceAtom)
  const [total] = useAtom(groupDeviceTotalAtom)
  const [page, setPage] = useAtom(groupDevicePageAtom)
  const [page_size, setPageSize] = useAtom(groupDevicePageSizeAtom)

  const refresh = useRefreshGroupDevice()

  const handleChange = (page: number, page_size: number) => {
    setPage(page)
    setPageSize(page_size)
  }

  React.useEffect(
    () => {
      refresh(true)
    },
    [group, page_size]
  )

  React.useEffect(
    () => {
      refresh()
    },
    [page]
  )


  return {
    deviceList,
    page,
    setPage,
    total,
    handleChange,
    page_size,
  }
}

export const useRegister = () => {
  const [form] = Form.useForm<{ group: DeviceGroupOptions, gtx: UploadFile[] }>()
  const [, setStep] = useAtom(stepAtom)
  const [, setRes] = useAtom(registerResultAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleCancel = () => {
    setStep('device')
  }

  const handleSubmit = async () => {
    const { gtx, group } = await form.validateFields()
    const formData = new FormData()

    gtx.forEach(file => {
      file.originFileObj && formData.append('files', file.originFileObj)
    })

    const { success, data } = await deviceAPI.offlineRegister(group.value, formData, DeviceType.TERMINAL)

    setLoading(false)

    if (!success) return

    setRes(data || [])

    setTimeout(() => {
      setStep('reg_res')
    })
  }

  return {
    form,
    handleSubmit,
    handleCancel,
    loading,
  }
}
