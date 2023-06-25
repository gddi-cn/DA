import React from 'react'
import { useAtom } from 'jotai'
import _ from 'lodash'

import {
  nameAtom,
  inputOptionAtom,
  labelListAtom,
  labelOptionAtom,
  templateListAtom,
  selectedTemplateAtom,
  handleChangeFnRefAtom,
  fetchingTemplateAtom,
} from './store'

import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import pic_default_cover from '@src/asset/images/space/pic.png'
import stream_default_cover from '@src/asset/images/space/stream.png'
import { AppTemplateInput } from '@src/shared/enum/application'

import appAPI from '@src/apis/app'
import { DeviceType } from '@src/shared/enum/device'

export const useNameFilter = () => {
  const [name, setName] = useAtom(nameAtom)
  const [localName, setLocalName] = React.useState<string | undefined>(name)

  const debouncedSetName = React.useMemo(() => _.debounce(setName, 400), [])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalName(e.target?.value)
  }

  React.useEffect(
    () => {
      debouncedSetName(localName)
    },
    [localName]
  )

  return {
    name: localName,
    handleChange,
  }
}

export const useTemplateLabelFilter = () => {
  const [templateLabelList] = useAtom(labelListAtom)
  const [selectedTemplateLabelOption, setSelectedTemplateLabelOption] =
    useAtom(labelOptionAtom)

  const getOptions = (name: string):
    Promise<Array<{ key: string, value: string, label: string }>> =>
    Promise.resolve(
      templateLabelList
        .filter(x => x && x.includes(name))
        .map(x => ({ key: x, value: x, label: x }))
    )

  const handleChange = (newOptions?: { key: string, value: string, label: string }) => {
    setSelectedTemplateLabelOption(newOptions || null)
  }

  return {
    selectedTemplateLabelOption,
    getOptions,
    handleChange,
  }
}

export const useInputFilter = () => {
  const [inputOption, setInputOption] = useAtom(inputOptionAtom)

  const handleChange = (
    newOption?: { key: string, value: AppTemplateInput, label: string }
  ) => {
    setInputOption(newOption)
  }

  return {
    inputOption,
    handleChange,
  }
}

export const useRefreshTemplate = () => {
  const [loading, setLoading] = useAtom(fetchingTemplateAtom)
  const [, setTemplateList] = useAtom(templateListAtom)
  const [selectedTemplate] = useAtom(selectedTemplateAtom)
  const [name] = useAtom(nameAtom)
  const [labelOption] = useAtom(labelOptionAtom)
  const [inputOption] = useAtom(inputOptionAtom)
  const [handleChangeFnRef] = useAtom(handleChangeFnRefAtom)

  return async () => {
    if (loading) return

    const label = labelOption?.value
    const input = inputOption?.value

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
      handleChangeFnRef?.current && handleChangeFnRef?.current(null)
    }

    setTemplateList(data.items || [])
  }
}

export const useList = () => {
  const [templateList] = useAtom(templateListAtom)
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  const refresh = useRefreshTemplate()

  const onDelete = (id: App.Template.Instance['id']) => {
    refresh()
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(undefined)
    }
  }

  return {
    templateList,
    onDelete,
  }
}

export const useTemplateItem = (template: App.Template.Instance) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const { cover: _cover, name, input, description, id, samples, format } = template || {}
  const [currentTemplate] = useAtom(selectedTemplateAtom)
  const [handleChangeRef] = useAtom(handleChangeFnRefAtom)

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
    handleChangeRef?.current && handleChangeRef?.current(template)
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
    buildIn: template.is_build_in,
    cover,
    name,
    InputIcon,
    inputTip,
    tagList: samples?.filter(Boolean) || [],
    description,
    containerRef,
    handleClick,
    format,
  }
}

const useRefreshLabelList = () => {
  const [, setLabelList] = useAtom(labelListAtom)

  return async () => {
    const { success, data } = await appAPI.templateLabelList()

    if (!success || !data) {
      setLabelList([])
      return
    }

    setLabelList(data)
  }
}

const useResetStore = () => {
  const [, setLoading] = useAtom(fetchingTemplateAtom)
  const [, setList] = useAtom(templateListAtom)
  const [, setName] = useAtom(nameAtom)
  const [, setLabelOption] = useAtom(labelOptionAtom)
  const [, setInputOption] = useAtom(inputOptionAtom)
  const [, setLabelList] = useAtom(labelListAtom)
  const [, sethandleChangeFn] = useAtom(handleChangeFnRefAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setList([])
      setName(undefined)
      setLabelOption(null)
      setInputOption(undefined)
      setLabelList([])
      sethandleChangeFn(undefined)
      setLoading(false)
    },
    []
  )
}

export const useTemplateList = (
  selectedTemplate?: App.Template.Instance,
  handleChangeFn?: (selected: App.Template.Instance | null) => void,
) => {
  useResetStore()
  const handleChangeRef = React.useRef<((selected: App.Template.Instance | null) => void) | undefined>(undefined)
  const refresh = useRefreshTemplate()
  const refreshLabelList = useRefreshLabelList()
  const [, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  const [, sethandleChangeFn] = useAtom(handleChangeFnRefAtom)

  const [name] = useAtom(nameAtom)
  const [labelOption] = useAtom(labelOptionAtom)
  const [inputOption] = useAtom(inputOptionAtom)

  const onCreate = () => {
    refresh()
  }

  React.useEffect(
    () => {
      refresh()
    },
    [name, labelOption, inputOption]
  )

  React.useEffect(
    () => {
      setSelectedTemplate(selectedTemplate)
    },
    [selectedTemplate]
  )

  React.useEffect(
    () => {
      handleChangeRef.current = handleChangeFn
      sethandleChangeFn(handleChangeRef)
    },
    [handleChangeFn]
  )

  React.useEffect(
    () => {
      refreshLabelList()
    },
    []
  )

  return {
    onCreate,
  }
}

