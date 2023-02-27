import React from 'react'
import { useAtom } from 'jotai'

import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import pic_default_cover from '@src/asset/images/space/pic.png'
import stream_default_cover from '@src/asset/images/space/stream.png'
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
import { AppTemplateInput } from '@src/shared/enum/application'
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
  const [currentTemplate] = useAtom(selectedTemplateAtom)
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
  }
}

export const useTemplateItem = (template: App.Template.Instance) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const { cover: _cover, name, input, labels, description, id } = template || {}
  const [currentTemplate, setCurrentTempalte] = useAtom(selectedTemplateAtom)

  const InputIcon = input === AppTemplateInput.IMAGE ? ImgServerIcon : VideoServerIcon
  const inputTip = input === AppTemplateInput.IMAGE ? '图片服务' : '视频流服务'

  const selected = id !== undefined && currentTemplate?.id === id

  const cover = _cover ? _cover : (
    input === AppTemplateInput.IMAGE
      ? pic_default_cover
      : stream_default_cover
  )

  const handleClick = () => {
    if (selected) return
    setCurrentTempalte(template)
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
    cover,
    name,
    InputIcon,
    inputTip,
    tagList: labels?.filter(Boolean) || [],
    description,
    containerRef,
    handleClick,
  }
}
