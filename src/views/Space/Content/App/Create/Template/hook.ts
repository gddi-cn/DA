import React from 'react'
import { useAtom } from 'jotai'

import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import pic_default_cover from '@src/asset/images/space/pic.png'
import stream_default_cover from '@src/asset/images/space/stream.png'
import { Space } from '@src/views/Space/enums'
import {
  currentStepAtom, fetchingTemplateListAtom,
  selectedTemplateAtom,
  templateInputFilterAtom, templateLabelFilterAtom,
  templateListAtom, templateListTotalAtom,
  templateNameFilterAtom,
} from '../store'
import appAPI from '@src/apis/app'
import { DeviceType } from '@src/shared/enum/device'
import { AppTemplateInput } from '@src/shared/enum/application'

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

  const refresh = useRefreshTemplate()

  const disabledNext = !currentTemplate

  const handlePre = () => {
    setCurrentStep(Space.App.Create.Step.META)
  }

  const handleNext = () => {
    setCurrentStep(Space.App.Create.Step.CONFIG)
  }

  React.useEffect(
    () => {
      refresh()
    },
    [name, labelOptions, input]
  )

  return {
    handlePre,
    handleNext,
    templateList,
    loading,
    disabledNext,
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
