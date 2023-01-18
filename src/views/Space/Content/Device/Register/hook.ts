import React from 'react'
import { useAtom } from 'jotai'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { Form, UploadFile } from 'antd'
import deviceAPI from '@src/apis/device'
import { stepAtom, registerResultAtom } from '../store'
import { DeviceType } from '@src/shared/enum/device'
import sdkAPI from '@src/apis/sdk'

export const useRegister = (type: DeviceType.TERMINAL | DeviceType.EDGE) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [form] = Form.useForm<{ group: DeviceGroupOptions, gtx: UploadFile[] }>()
  const [step, setStep] = useAtom(stepAtom)
  const [resList, setRes] = useAtom(registerResultAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  const title = step === 'device' ? '注册设备' : '注册结果'

  const handleBack = () => {
    setStep('device')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (loading) return

    const { gtx, group } = await form.validateFields()
    const formData = new FormData()

    gtx.forEach(file => {
      file.originFileObj && formData.append('files', file.originFileObj)
    })

    setLoading(true)
    const { success, data } = await deviceAPI.offlineRegister(group.value, formData, type)
    setLoading(false)

    if (!success) return

    setRes(data || [])

    setTimeout(() => {
      setStep('reg_res')
    })

    React.useEffect(
      () => {
        if (step !== 'reg_res') {
          setRes([])
        } 

        return () => setRes([])
      },
      [step]
    )
  }

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