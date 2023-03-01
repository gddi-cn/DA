import React from 'react'
import { useAtom } from 'jotai'

import { Space } from '@src/views/Space/enums'
import {
  currentStepAtom, fetchingTemplateListAtom,
  metaFormValueAtom,
  selectedTemplateAtom,
  templateInputFilterAtom, templateLabelFilterAtom,
  templateListAtom, templateListTotalAtom,
  templateNameFilterAtom,
} from '../store'
import appAPI from '@src/apis/app'
import s3API from '@src/apis/s3'
import { DeviceType } from '@src/shared/enum/device'
import { message } from 'antd'
import { currentAppIdAtom, currentPageAtom } from '../../store'
import { useRefreshAppList } from '../../List/hook'

export const useRefreshTemplate = () => {
  const [loading, setLoading] = useAtom(fetchingTemplateListAtom)
  const [, setTemplateList] = useAtom(templateListAtom)
  const [, setTotal] = useAtom(templateListTotalAtom)
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  const [name] = useAtom(templateNameFilterAtom)
  const [labelOptions] = useAtom(templateLabelFilterAtom)
  const [input] = useAtom(templateInputFilterAtom)

  return async () => {
    if (loading) return

    const label = labelOptions?.value

    setLoading(true)
    const { success, data } = await appAPI.templateList({
      device_type: DeviceType.EDGE,
      name,
      label,
      input,
      page: 1,
      page_size: 9999,
    })
    setLoading(false)

    if (!success || !data) return

    if (!data.items?.some(x => x.id === selectedTemplate?.id)) {
      setSelectedTemplate(null)
    }
    setTotal(data.total || 0)
    setTemplateList(data.items || [])
  }
}

export const useTemplate = () => {
  const [templateList] = useAtom(templateListAtom)
  const [loading] = useAtom(fetchingTemplateListAtom)
  const [name] = useAtom(templateNameFilterAtom)
  const [labelOptions] = useAtom(templateLabelFilterAtom)
  const [input] = useAtom(templateInputFilterAtom)
  const [, setCurrentStep] = useAtom(currentStepAtom)
  const [currentTemplate, setCurrentTempalte] = useAtom(selectedTemplateAtom)
  const [creating, setCreating] = React.useState<boolean>(false)
  const [metaFormValue] = useAtom(metaFormValueAtom)

  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentAppId] = useAtom(currentAppIdAtom)

  const refresh = useRefreshTemplate()
  const refreshList = useRefreshAppList()

  const disabledNext = !currentTemplate

  const handlePre = () => {
    setCurrentStep(Space.App.Create.Step.META)
  }

  const handleCreate = async () => {
    if (creating) return

    if (!metaFormValue) return
    
    const { id: app_template_id } = currentTemplate || {}

    if (!app_template_id) return

    const { name, cover: _cover, description, adapter_device: _device  } = metaFormValue

    const adapter_device = _device?.key

    if (!adapter_device) return

    let cover: string | undefined

    if (_cover?.length) {
      const { success, data } = await s3API.uploadFile(_cover[0])
      if (!success || !data) {
        message.warn('上传封面失败，请稍后再试')
        return
      }
      cover = data
    }

    setCreating(true)
    const { success, data } = await appAPI.create({
      adapter_device,
      app_template_id,
      cover,
      description,
      name,
    })
    setCreating(false)

    if (!success || !data?.id) return

    setCurrentAppId(data.id)
    setCurrentPage(Space.App.Page.CONFIG)
    message.success('创建成功，请为应用添加模型')
    refreshList()
  }

  const handleChange = (selected: App.Template.Instance | null) => {
    setCurrentTempalte(selected)
  }

  React.useEffect(
    () => {
      refresh()
    },
    [name, labelOptions, input]
  )

  return {
    handlePre,
    handleCreate,
    templateList,
    loading,
    disabledNext,
    creating,
    template: currentTemplate,
    handleChange,
  }
}

