import React from 'react'
import _ from 'lodash'

import appAPI from '@src/apis/app'
import { useAtom } from 'jotai'
import {
  appListAtom,
  fetchingAppAtom,
  nameFilterAtom,
  appTotalAtom,
  selectedDeviceTypeAtom,
  currentPageAtom,
  currentAppIdAtom,
  templateLabelListAtom,
  selectedTemplateLabelOptionAtom,
  pageFilterAtom,
  pageSizeFilterAtom,
  templateInputAtom,
} from '../store'

import default_cover from '@src/asset/images/app/default_cover.png'
import { Space } from '@src/views/Space/enums'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import { AppTemplateInput } from '@src/shared/enum/application'

export const useAppList = () => {
  const [loading] = useAtom(fetchingAppAtom)
  const [appList] = useAtom(appListAtom)

  return {
    appList,
    loading,
  }
}

export const useNameFilter = () => {
  const [name, setName] = useAtom(nameFilterAtom)
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

export const useDeviceFilter = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useAtom(selectedDeviceTypeAtom)

  const handleChange = (newValue?: Device.Chip.Option) => {
    setSelectedDeviceType(newValue || null)
  }

  return {
    value: selectedDeviceType,
    handleChange,
  }
}

export const useCreateBtn = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleClick = () => {
    setCurrentPage(Space.App.Page.CREATE)
  }

  return {
    handleClick,
  }
}

export const useAppItem = (app: App.Instance) => {
  const {
    cover, name, id,
    template_name, input,
    adapter_device,
  }  = app

  const [, setCurrentAppId] = useAtom(currentAppIdAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const InputIcon = input === AppTemplateInput.IMAGE? ImgServerIcon : VideoServerIcon
  const inputTip = input === AppTemplateInput.IMAGE ? '图片服务' : '视频流服务'

  const handleClick = () => {
    setCurrentAppId(id)
    setCurrentPage(Space.App.Page.DETAIL)
  }


  return {
    cover: cover || default_cover,
    name,
    handleClick,
    template_name,
    adapter_device,
    InputIcon,
    inputTip,
  }
}

export const useTemplateLabelFilter = () => {
  const [templateLabelList] = useAtom(templateLabelListAtom)
  const [selectedTemplateLabelOption, setSelectedTemplateLabelOption] =
    useAtom(selectedTemplateLabelOptionAtom)

  const getOptions = (name: string):
    Promise<Array<{key: string, value: string, label: string}>> =>
    Promise.resolve(
      templateLabelList
        .filter(x => x && x.includes(name))
        .map(x => ({ key: x, value: x, label: x }))
    )

  const handleChange = (newOptions?: {key: string, value: string, label: string}) => {
    setSelectedTemplateLabelOption(newOptions || null)
  }

  return {
    selectedTemplateLabelOption,
    getOptions,
    handleChange,
  }
}

export const useInputFilter = () => {
  const [inputOption, setInputOption] = useAtom(templateInputAtom)

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
