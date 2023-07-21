import React from 'react'
import { useAtom } from 'jotai'
import { Form, message } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'
import { getBase64 } from '@src/utils'
import s3API from '@src/apis/s3'

import appAPI from '@src/apis/app'
import {
  baseFormAtom,
  baseFormValueAtom,
  creatingAppAtom,
  selectedTemplateAtom,
  stepAtom,
  useCancel,
} from './store'
import { FooterProps } from './Footer'

export const useResetStore = () => {
  const [, setLoading] = useAtom(creatingAppAtom)
  const [, setbaseFormValue] = useAtom(baseFormValueAtom)
  const [, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  const [, setStep] = useAtom(stepAtom)
  const [, setForm] = useAtom(baseFormAtom)

  return () => {
    setLoading(true)
    setForm(null)
    setbaseFormValue(null)
    setSelectedTemplate(null)
    setStep('base')
    setLoading(false)
  }
}

export const useBaseForm = () => {
  const [form] = Form.useForm<App.CreateForm>()
  const [formValue] = useAtom(baseFormValueAtom)
  const [, setForm] = useAtom(baseFormAtom)

  const [showUploadBtn, setShowUploadBtn] = React.useState<boolean>(true)
  const [previewTitle, setPreviewTitle] = React.useState<string>('')
  const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(undefined)

  const handleCoverChange = async <T>(info: UploadChangeParam<UploadFile<T>>) => {
    if (!info.fileList?.length) {
      setShowUploadBtn(true)
      setPreviewSrc(undefined)
      setPreviewTitle('')
      return
    }

    setShowUploadBtn(false)
    setPreviewSrc(await getBase64(info.file as RcFile))
    setPreviewTitle(info.file.name)
  }

  React.useEffect(
    () => {
      if (!formValue) return

      form.setFieldsValue(formValue)

      const coverList = formValue.cover

      if (!coverList?.length) return

      const cover = (coverList[0] as UploadFile).originFileObj
      if (!cover) return

      getBase64(cover)
        .then((previewSrc) => {
          setShowUploadBtn(false)
          setPreviewSrc(previewSrc)
          setPreviewTitle(cover.name)
        })

    },
    []
  )

  React.useEffect(
    () => {
      setForm(form)
    },
    []
  )

  return {
    form,
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  }
}

export const useTemplate = () => {
  const [template, setTemplate] = useAtom(selectedTemplateAtom)

  const handleChange = (selected: App.Template.Instance | null) => {
    setTemplate(selected)
  }

  return {
    template,
    handleChange,
  }
}

export const useFooter = (
  {
    onCreate,
    onCancel,
    modelIterId: model_iter_id,
  }: FooterProps
) => {
  const [step, setStep] = useAtom(stepAtom)
  const [form] = useAtom(baseFormAtom)
  const [formValue, setFormValue] = useAtom(baseFormValueAtom)
  const [loading, setLoading] = useAtom(creatingAppAtom)
  const [formLoading, setFormLoading] = React.useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const handleCancel = useCancel(onCancel)

  const handlePre = () => {
    if (step === 'base') return
    setStep('base')
  }

  const handleNext = async () => {
    if (step === 'template') return
    if (!form || formLoading) return
    setFormLoading(true)

    try {
      const baseFormValue = await form.validateFields()
      setFormValue(baseFormValue)
      setStep('template')
    } catch (e) {
      console.error(e)
    } finally {
      setFormLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      if (!formValue) return
      if (!selectedTemplate) {
        message.warn('请选择模板')
        return
      }

      const {
        name, adapter_device, cover: coverFileList, description
      } = formValue || {}
      const coverFile = (coverFileList || [])[0]

      setLoading(true)

      let cover: string | undefined

      if (coverFile) {
        const { success, data } = await s3API.uploadFile(coverFile)

        if (success && data)
          cover = data
      }

      const { success, data } = await appAPI.create({
        name,
        app_template_id: selectedTemplate.id,
        adapter_device: adapter_device.value,
        model_iter_id,
        cover,
        description,
      })

      setLoading(false)

      if (!success || !data) return
      onCreate(data)

    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return {
    base: step === 'base',
    loading,
    formLoading,
    handleCancel,
    handleNext,
    handlePre,
    handleCreate,
  }
}

export const useCreateApp = (onCancel?: () => void, onCreate?: (app: App.Instance) => void) => {
  useResetStore()
  const [step] = useAtom(stepAtom)
  const handleClose = useCancel(onCancel)

  const handleCreate = (app: App.Instance) => {
    handleClose()
    onCreate?.(app)
  }

  return {
    step,
    handleClose,
    handleCreate,
  }
}
