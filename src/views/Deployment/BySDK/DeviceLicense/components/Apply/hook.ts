import React from 'react'
import { useAtom } from 'jotai'
import produce from 'immer'
import { Form, UploadFile } from 'antd'

import {
  dialogOpenAtom,
  fetchingGroupDeviceAtom,
  groupDeviceAtom,
  groupDevicePageAtom,
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

  React.useEffect(
    () => {
      if (open) return

      setGroup(null)
      setDeviceList([])
      setLoading(false)
      setTotal(0)
      setPage(1)
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

  const indeterminate = selected.length > 0 && selected.length < deviceList.length
  const checkedAll = selected.length >= deviceList.length

  const handleToggle = () => {
    if (checkedAll) {
      setSelected([])
    } else {
      setSelected(deviceList.map(x => x.id))
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

export const useGroupDevice = () => {
  const [group] = useAtom(selectedDeviceGroupAtom)
  const [deviceList, setDeviceList] = useAtom(groupDeviceAtom)
  const [loading, setLoading] = useAtom(fetchingGroupDeviceAtom)
  const [total,setTotal] = useAtom(groupDeviceTotalAtom)
  const [page, setPage] = useAtom(groupDevicePageAtom)
  const [, setSelected] = useAtom(selectedDeviceAtom)

  React.useEffect(
    () => {
      if (!(group?.value || group?.value === 0) || loading) return

      let type: DeviceType | undefined
      if (group.value === 0) {
        type = DeviceType.TERMINAL
      }

      setLoading(true)

      deviceGroupAPI
        .fetchGroupDeviceList(group.value, { page, page_size: 7, type })
        .then(({ success, data }) => {
          if (!success || !data) return
          const { items, total } = data

          setTotal(total || 0)
          setDeviceList(items || [])

          setSelected(s => _.intersection((items || []).map(x => x.id), s))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [group, page]
  )


  return {
    deviceList,
    page,
    setPage,
    total
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

    const { success, data } = await deviceAPI.offlineRegister(group.value, formData)

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