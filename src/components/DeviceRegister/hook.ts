import React from 'react'
import { useAtom } from 'jotai'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { Form, UploadFile } from 'antd'
import deviceAPI from '@src/apis/device'
import { stepAtom, registerResultAtom, deviceTypeListAtom } from './store'
import { DeviceType } from '@src/shared/enum/device'
import sdkAPI from '@src/apis/sdk'

export const useRefreshDeviceTypeList = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [, setDeviceTypeList] = useAtom(deviceTypeListAtom)

  return async () => {
    if (loading) return

    setLoading(true)

    const { success, data } = await deviceAPI.chipTypeList({
      page: 1,
      page_size: 999,
      type: DeviceType.EDGE,
    })

    setLoading(false)

    if (!success || !data?.items) {
      setDeviceTypeList([])
      return
    }

    setDeviceTypeList(data.items || [])
  }
}

export const useRegister = (
  getDefaultSelectedGroup: () => DeviceGroupOptions | null,
  onRegist?: () => void
) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [form] = Form.useForm<{
    group: DeviceGroupOptions,
    gtx: UploadFile[],
    device_type_id?: Device.Chip.Instance['key']
  }>()
  const [step, setStep] = useAtom(stepAtom)
  const [resList, setRes] = useAtom(registerResultAtom)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [deviceTypeList] = useAtom(deviceTypeListAtom)

  const refreshDeviceTypeList = useRefreshDeviceTypeList()
  const options = deviceTypeList.map(t => ({ key: t.key, label: t.name, value: t.key }))

  const title = step === 'device' ? '注册设备' : '注册结果'

  const handleBack = () => {
    setStep('device')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    const defaultSelectedGroup = getDefaultSelectedGroup()
    defaultSelectedGroup && form.setFieldValue('group', defaultSelectedGroup)
    refreshDeviceTypeList()
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (loading) return

    const { gtx, group, device_type_id } = await form.validateFields()
    const formData = new FormData()

    gtx.forEach(file => {
      file.originFileObj && formData.append('files', file.originFileObj)
    })

    setLoading(true)
    const { success, data } = await deviceAPI.offlineRegister(
      group.value,
      formData,
      DeviceType.EDGE,
      device_type_id,
    )
    setLoading(false)
    onRegist && onRegist()

    if (!success) return

    setRes(data || [])

    setTimeout(() => {
      setStep('reg_res')
    })

  }

  React.useEffect(
    () => {
      if (open) return

      setRes([])
      setStep('device')
      form.resetFields()
    },
    [open]
  )

  return {
    resList,
    open,
    title,
    handleOpen,
    handleClose,
    step,
    form,
    handleSubmit,
    handleBack,
    loading,
    options,
  }
}

export const useDocument = () => {
  const [docList, setDocList] = React.useState<Array<SDK.Document.Instance>>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const fetchDocList = async () => {
    if (loading) return

    setLoading(true)
    const { success,data } = await sdkAPI.documentList({})
    setLoading(false)

    if (!success || !data) {
      setDocList([])
      return
    }

    setDocList(data || [])
  }

  React.useEffect(
    () => {
      fetchDocList()
      return () => {
        setDocList([])
      }
    },
    []
  )

  return {
    docList,
  }
}
