import React from 'react'
import { useAtom } from 'jotai'
import { Form, message } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'
import { getBase64 } from '@src/utils'
import s3API from '@src/apis/s3'
import { Platform } from '@views/Platform/enum'
import { currentVersionIdAtom } from '@src/components/ModelVersionSelector/store'
import {
  createAppOpenAtom,
  currentStepAtom,
  deviceTypeListAtom,
  selectedAppAtom
} from '../store'
import appAPI from '@src/apis/app'
import { baseFormAtom, baseFormValueAtom, creatingAppAtom, selectedTemplateAtom, stepAtom } from './store'

export const useResetStore = () => {
  const [open] = useAtom(createAppOpenAtom)
  const [, setLoading] = useAtom(creatingAppAtom)
  const [, setbaseFormValue] = useAtom(baseFormValueAtom)
  const [, setSelectedTemplate]= useAtom(selectedTemplateAtom)
  const [, setStep] = useAtom(stepAtom)
  const [, setForm] = useAtom(baseFormAtom)

  React.useEffect(
    () => () => {
      if (open) return
      setLoading(true)
      setForm(null)
      setbaseFormValue(null)
      setSelectedTemplate(null)
      setStep('base')
      setLoading(false)
    },
    [open]
  )
}

export const useBaseForm = () => {
  const [form] = Form.useForm<App.CreateForm>()
  const [deviceTypeList] = useAtom(deviceTypeListAtom)
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

  const options = deviceTypeList.map(
    type => ({ key: type.key, label: type.name, value: type.key })
  )

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
    options,
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

export const useFooter = () => {
  const [step, setStep] = useAtom(stepAtom)
  const [, setOpen] = useAtom(createAppOpenAtom)
  const [form] = useAtom(baseFormAtom)
  const [formValue] = useAtom(baseFormValueAtom)
  const [loading, setLoading] = useAtom(creatingAppAtom)
  const [formLoading, setFormLoading] = React.useState<boolean>(false)
  const [, setFormValue] = useAtom(baseFormValueAtom)
  const [model_iter_id] = useAtom(currentVersionIdAtom)
  const [, setSelectedApp] = useAtom(selectedAppAtom)
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [selectedTemplate] = useAtom(selectedTemplateAtom)

  const handleCancel = () => {
    setOpen(false)
  }

  const handlePre = () => {
    if (step === 'base') return
    setStep('base')
  }

  const handleNext = async () => {
    if (step === 'template') return
    if (!form || formLoading) return

    setFormLoading(true)
    const baseFormValue = await form.validateFields()
    setFormLoading(false)

    setFormValue(baseFormValue)

    setStep('template')
  }

  const handleCreate = async () => {
   try {
      if (!model_iter_id || !formValue) return
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
        adapter_device,
        cover,
        description,
        model_iter_id,
      })

      setLoading(false)

      if (!success || !data) return

      setOpen(false)

      setSelectedApp(data)

      setCurrentStep(Platform.Step.CONFIG)
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

export const useCreateApp = () => {
  useResetStore()
  const [open, setOpen] = useAtom(createAppOpenAtom)
  const [step] = useAtom(stepAtom)

  const handleCancel = () => {
    setOpen(false)
  }


  return {
    open,
    handleCancel,
    step,
  }
}
