import React from 'react'
import { useAtom } from 'jotai'
import { Form, MenuProps, message, Modal } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'

import {
  appListAtom,
  createAppOpenAtom,
  currentStepAtom,
  deviceTypeListAtom, fetchingAppListAtom,
  modelVersionIdAtom,
  selectDeviceTypeAtom,
  selectedAppAtom
} from '../store'
import appAPI from '@src/apis/app'
import { DeviceType } from '@src/shared/enum/device'
import { getBase64 } from '@src/utils'
import s3API from '@src/apis/s3'
import { Platform } from '@views/Platform/enum'
import { useRefreshAppList, useRefreshDeviceTypeList } from '@views/Platform/hook'

export const useCreateApp = () => {
  const [form] = Form.useForm<App.CreateForm>()
  const [open, setOpen] = useAtom(createAppOpenAtom)
  const [deviceTypeList] = useAtom(deviceTypeListAtom)

  const [templateList, setTemplateList] = React.useState<Array<App.Template.Instance>>([])
  const [advanceTemplateList, setAdvanceTemplateList] = React.useState<Array<App.Template.Instance>>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [fetchingTemplate, setFetchingTemplate] = React.useState<boolean>(false)

  const [showUploadBtn, setShowUploadBtn] = React.useState<boolean>(true)
  const [previewTitle, setPreviewTitle] = React.useState<string>('')
  const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(undefined)

  const [, setSelectedApp] = useAtom(selectedAppAtom)
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [model_iter_id] = useAtom(modelVersionIdAtom)

  const options = deviceTypeList.map(type => ({ key: type.key, label: type.name, value: type.key }))

  const handleCancel = () => {
    setOpen(false)
  }

  const fetchTemplateList = async () => {
    form.setFieldValue('app_template_id', undefined)

    if (fetchingTemplate) return

    setFetchingTemplate(true)

    const { success, data } = await appAPI.templateList({
      page: 1,
      page_size: 999,
      device_type: DeviceType.EDGE,
      // device_type_id: deviceChipId,
    })

    setFetchingTemplate(false)

    if (!success || !data?.items) {
      setTemplateList([])
      setAdvanceTemplateList([])
      return
    }

    const list: Array<App.Template.Instance> = []
    const aList: Array<App.Template.Instance> = [];

    (data.items || []).forEach(tem => {
      tem.advance ? aList.push(tem) : list.push(tem)
    })

    setTemplateList(list)
    setAdvanceTemplateList(aList)
  }

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

  const handleCreate = async () => {
    try {
      if (!model_iter_id) return
      const { name, app_template_id, adapter_device, cover: coverFileList, description } = await form.validateFields()
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
        app_template_id,
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

  React.useEffect(
    () => {
      if (!open) {
        setTemplateList([])
        setAdvanceTemplateList([])
      } else {
        fetchTemplateList()
      }
    },
    [open]
  )

  return {
    form,
    open,
    loading,
    options,
    handleCancel,
    handleCreate,
    templateList,
    advanceTemplateList,
    handleCoverChange,
    showUploadBtn,
    previewSrc,
    previewTitle,
  }
}

export const useSelectApp = () => {
  const [appList] = useAtom(appListAtom)
  const [modelVersionId] = useAtom(modelVersionIdAtom)
  const [selectDeviceType] = useAtom(selectDeviceTypeAtom)
  const [loading] = useAtom(fetchingAppListAtom)

  const showList = appList.length > 0

  const refreshAppList = useRefreshAppList()
  const refreshDeviceTypeList = useRefreshDeviceTypeList()

  React.useEffect(
    () => {
      refreshAppList()
      refreshDeviceTypeList()
    },
    [modelVersionId, selectDeviceType]
  )

  return {
    showList,
    loading,
  }
}


export const useSidebar = () => {
  const [deviceTypeList] = useAtom(deviceTypeListAtom)
  const [, setSelectedDeviceType] = useAtom(selectDeviceTypeAtom)
  const [, setOpen] = useAtom(createAppOpenAtom)

  const options = deviceTypeList.map(t => ({ key: t.key, label: t.name, value: t.key }))

  const handleChange = (chipId?: Device.Chip.Instance['key']) => {
    if (!chipId) {
      setSelectedDeviceType(null)
      return
    }

    const [chip] = deviceTypeList.filter(x => x.key === chipId)

    setSelectedDeviceType(chip || null)
  }

  const handleClick = () => {
    setOpen(true)
  }

  return {
    handleChange,
    options,
    handleClick,
  }
}

export const useAppList = () => {
  const [appList] = useAtom(appListAtom)

  return {
    appList
  }
}

export const useAppItem = (instance: App.Instance) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [selectedApp, setSelectedApp] = useAtom(selectedAppAtom)
  const selected = selectedApp?.id === instance.id

  const [deleting, setDeleting] = React.useState<boolean>(false)

  const refresh = useRefreshAppList()


  const handleClick = () => {
    setSelectedApp(selected ? undefined : instance)
  }

  const handleDelete = async (e: any) => {
    e?.domEvent?.stopPropagation()
    e?.domEvent?.preventDefault()

    const { id } = instance || {}
    if (!id) return

    if (deleting) return

    Modal.confirm({
      title: '删除应用',
      content: '确定要删除该应用吗？',
      okText: '删除',
      cancelText: '取消',
      onOk: async () => {
        setDeleting(true)
        const { success } = await appAPI.delete(id) 
        setDeleting(false)

        if (success) {
          message.success('删除成功')
        }

        if (selected) {
          setSelectedApp(undefined)
        }

        await refresh()
      }
    })
  }

  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  return {
    containerRef,
    handleClick,
    handleDelete,
  }
}
