import React from 'react'
import { Form } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'


import { useAtom } from 'jotai'
import { Space } from '@src/views/Space/enums'
import { getBase64 } from '@src/utils'
import {
  currentStepAtom, fetchingTemplateListAtom,
  metaFormValueAtom, selectedTemplateAtom, templateInputFilterAtom,
  templateLabelFilterAtom, templateListAtom,
  templateListTotalAtom, templateNameFilterAtom,
} from './store'

import {
  currentPageAtom
} from '../store'

const useResetStore = () => {
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [, setFormValue] = useAtom(metaFormValueAtom)
  const [, setFetchingTemplateList] = useAtom(fetchingTemplateListAtom)
  const [, setTemplateList] = useAtom(templateListAtom)
  const [, setTemplateTotal] = useAtom(templateListTotalAtom)
  const [, setTemplateNameFilter] = useAtom(templateNameFilterAtom)
  const [, setTemplateLabelFilter] = useAtom(templateLabelFilterAtom)
  const [, setTemplateInputFilter] = useAtom(templateInputFilterAtom)
  const [, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  
  React.useEffect(
    () => {
      return () => {
        setFetchingTemplateList(true)
        setCurrentStep(Space.App.Create.Step.META)
        setFormValue(null)
        setTemplateList([])
        setTemplateTotal(0)
        setTemplateNameFilter(undefined)
        setTemplateLabelFilter(null)
        setTemplateInputFilter(undefined)
        setSelectedTemplate(null)
        setFetchingTemplateList(false)
      }
    },
    []
  )
}

export const useCreateApp = () => {
  useResetStore()

  const [currentStep] = useAtom(currentStepAtom)

  return {
    currentStep,
  }
}

export const useMeta = () => {
  const [formValue, setFormValue] = useAtom(metaFormValueAtom)
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const [form] =
  Form.useForm<
    Omit<App.CreateForm, 'adapter_device'> &
    { adapter_device: Device.Chip.Instance }
  >()

  const [loading, setLoading] = React.useState<boolean>(false)
  // Cover Uploader state
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

  const handleCancel = () => {
    setCurrentPage(Space.App.Page.LIST)
  }

  const handleNext = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      setLoading(false)
      setFormValue(values)
      setCurrentStep(Space.App.Create.Step.TEMPLATE)
    } catch {
      setLoading(false)
    }
    
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

  return {
    form: form || undefined,
    loading,
    handleCancel,
    handleNext,
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  }
}

export const useConfig = () => {
  const [, setCurrentStep] = useAtom(currentStepAtom)

  const handlePre = () => {
    setCurrentStep(Space.App.Create.Step.TEMPLATE)
  }

  return {
    handlePre,
  }
}

