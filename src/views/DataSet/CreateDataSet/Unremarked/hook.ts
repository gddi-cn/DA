import datasetAPI from "@src/apis/dataset"
import { RootState } from "@src/controller/reducer"
import { APP_DATASET_CREATE_TYPE, APP_DATA_SET_INDEX } from "@src/router"
import { Form } from "antd"
import { useAtom } from "jotai"
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { stepAtom, baseFormAtom, requirementAtom, taskIdAtom, baseFormDataAtom } from './store'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { RcFile } from "antd/es/upload"

const getBase64 = (file: RcFile): Promise<string> =>

  new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = error => reject(error);

  });

export const useUnremarked = () => {
  const [, setTaskId] = useAtom(taskIdAtom)
  const [, setStep] = useAtom(stepAtom)
  const [baseForm] = useAtom(baseFormAtom)
  const [requirementForm] = useAtom(requirementAtom)

  const taskId = useSelector((state: RootState) => state.tasksSilce?.activeTaskInfo?.id)

  React.useEffect(
    () => {
      setTaskId(taskId || null)
    },
    [taskId]
  )

  // Reset store
  React.useEffect(
    () => {
      return () => {
        setStep('base')
        baseForm && baseForm.resetFields()
        requirementForm && requirementForm.resetFields()
      }
    },
    []
  )
}

export const useBaseForm = () => {
  const [, setBaseForm] = useAtom(baseFormAtom)
  const [step] = useAtom(stepAtom)
  const [form] = Form.useForm<Unremarked.Form.Base>()
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
      setBaseForm(form)
    },
    [form]
  )

  return {
    form: form,
    show: step === 'base',
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  }
}

export const useRequirementForm = () => {
  const [, setRequirementForm] = useAtom(requirementAtom)
  const [step] = useAtom(stepAtom)
  const [form] = Form.useForm<Unremarked.Form.Requirement>()

  const [previewSrc, setPreviewSrc] = React.useState<string>('')
  const [previewTitle, setPreviewTitle] = React.useState<string>('')
  const [previewOpen, setPreviewOpen] = React.useState<boolean>(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewSrc(file.preview as string)
    setPreviewTitle(file.name)
    setPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
  }

  React.useEffect(
    () => {
      setRequirementForm(form)
    },
    [form]
  )

  return {
    form,
    show: step === 'requirement',
    previewSrc,
    previewTitle,
    previewOpen,
    handlePreview,
    handleClosePreview,
  }
}

export const useFooter = () => {
  const navigate = useNavigate()

  const [taskId] = useAtom(taskIdAtom)
  const [step, setStep] = useAtom(stepAtom)
  const [baseForm] = useAtom(baseFormAtom)
  const [requirementForm] = useAtom(requirementAtom)
  const [baseFormData, setBaseFormData] = useAtom(baseFormDataAtom)



  const handleBase = async () => {
    if (!baseForm) return

    setBaseFormData(await baseForm.validateFields())

    setStep('requirement')
  }

  const handleSubmit = async () => {
    if (!baseFormData|| !requirementForm || !taskId) return

    const workOrderData = await requirementForm.validateFields()


    const {} = await datasetAPI.createUnRemarked(baseFormData, workOrderData, taskId)
  }

  const handlePre = () => {
    if (step === 'base')
      return navigate(APP_DATASET_CREATE_TYPE)

    if (step === 'requirement')
      return setStep('base')
  }

  const handleCancel = () => {
    return navigate(APP_DATA_SET_INDEX)
  }

  const handleNext = async () => {
    if (step === 'base')
      return await handleBase()

    if (step === 'requirement')
      return await handleSubmit()
  }

  const nextLabel = step === 'base' ? '下一步' : '提交'

  return {
    handlePre,
    handleCancel,
    handleNext,
    nextLabel,
  }
}

