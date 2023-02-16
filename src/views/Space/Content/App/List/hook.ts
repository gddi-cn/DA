import appAPI from '@src/apis/app'
import { useAtom } from 'jotai'
import React from 'react'
import produce from 'immer'
import _ from 'lodash'

const THREADHOLD = 0.95

import {
  appListAtom,
  fetchingAppAtom,
  nameFilterAtom,
  selectedDeviceTypeAtom,
  appTotalAtom,
  currentPageAtom,
  currentAppIdAtom,
  templateLabelListAtom,
  selectedTemplateLabelOptionAtom,
  pageFilterAtom,
  pageSizeFilterAtom,
  templateInputAtom,
  listInitAtom,
  scrollbarRefAtom,
} from '../store'

import default_cover from '@src/asset/images/app/default_cover.png'
import { Space } from '@src/views/Space/enums'
import { ReactComponent as ImgServerIcon } from '@src/asset/icons/app/img_server.svg'
import { ReactComponent as VideoServerIcon } from '@src/asset/icons/app/stream_server.svg'
import { AppTemplateInput } from '@src/shared/enum/application'
import { positionValues } from 'react-custom-scrollbars'

export const useRefreshAppList = () => {
  const [, setAppList] = useAtom(appListAtom)
  const [, setTotal] = useAtom(appTotalAtom)
  const [loading, setLoading] = useAtom(fetchingAppAtom)
  const [page, setPage] = useAtom(pageFilterAtom)
  const [page_size] = useAtom(pageSizeFilterAtom)
  const [name] = useAtom(nameFilterAtom)
  const [selectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [selectedTemplateLabel] = useAtom(selectedTemplateLabelOptionAtom)
  const [inputOption] = useAtom(templateInputAtom)

  const device = selectedDeviceType?.value
  const label = selectedTemplateLabel?.value
  const input = inputOption?.value

  return async () => {
    if (loading) return

    setLoading(true)
    setPage(1)
    const { success, data } = await appAPI.list({
      page,
      page_size,
      device,
      name,
      label,
      input,
    })
    setLoading(false)

    if (!success || !data?.items) {
      setTotal(0)
      setAppList([])
      return
    }

    setAppList(data.items || [])
    setTotal(data?.total || 0)
  }
}

export const useFetchAppList = () => {
  const [, setAppList] = useAtom(appListAtom)
  const [, setTotal] = useAtom(appTotalAtom)
  const [loading, setLoading] = useAtom(fetchingAppAtom)
  const [page_size] = useAtom(pageSizeFilterAtom)
  const [name] = useAtom(nameFilterAtom)
  const [selectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [selectedTemplateLabel] = useAtom(selectedTemplateLabelOptionAtom)
  const [inputOption] = useAtom(templateInputAtom)

  const device = selectedDeviceType?.value
  const label = selectedTemplateLabel?.value
  const input = inputOption?.value

  return async (page: number) => {
    if (loading) return

    setLoading(true)
    const { success, data } = await appAPI.list({
      page,
      page_size,
      device,
      name,
      label,
      input,
    })
    setLoading(false)

    if (!success) {
      setTotal(0)
      setAppList([])
      return
    }

    setAppList(produce(draft => {draft.push(...(data?.items || []))}))
    setTotal(data?.total || 0)
  }
}

export const useAppListFetcher = () => {
  const [init, setInit] = useAtom(listInitAtom)
  const [page, setPage] = useAtom(pageFilterAtom)
  const [page_size] = useAtom(pageSizeFilterAtom)
  const [name] = useAtom(nameFilterAtom)
  const [selectedDeviceType] = useAtom(selectedDeviceTypeAtom)
  const [selectedTemplateLabel] = useAtom(selectedTemplateLabelOptionAtom)
  const [inputOption] = useAtom(templateInputAtom)
  const [scrollbarRef, setScrollbarRef] = useAtom(scrollbarRefAtom)
  const [total] = useAtom(appTotalAtom)
  const [appList, setAppList] = useAtom(appListAtom)
  const _scrollbarRef = React.useRef(null)

  const refresh = useRefreshAppList()
  const fetchAppList = useFetchAppList()

  React.useLayoutEffect(() => {
    setScrollbarRef(_scrollbarRef)
  }, [])

  React.useEffect(
    () => {
      if (appList.length <= 0) {
        refresh()
        return
      }

      if (appList.length >= total) {
        setInit(true)
        return
      }

      const $s = scrollbarRef?.current
      if (!$s) return

      const { clientHeight, scrollHeight } = $s.getValues()

      if (scrollHeight * THREADHOLD > clientHeight) {
        setInit(true)
        return
      }

      setPage(p => p + 1)
    },
    [appList]
  )

  React.useEffect(
    () => {
      if (!init) return
      fetchAppList(page)
    },
    [page]
  )
   
  React.useEffect(
    () => {
      if (!init) return 
      setInit(false)
      setPage(1)
      setAppList([])
    },
    [page_size, name, selectedDeviceType, selectedTemplateLabel, inputOption]
  )
}

export const useAppList = () => {
  const [loading] = useAtom(fetchingAppAtom)
  const [appList] = useAtom(appListAtom)
  const [total] = useAtom(appTotalAtom)
  const [scrollbarRef] = useAtom(scrollbarRefAtom)
  const [page, setPage] = useAtom(pageFilterAtom)

  const debouncedSetPage = React.useMemo(() => _.debounce(setPage, 400), [])

  const handleScroll: ((values: positionValues) => void) = ({ top }) => {
    if (top < THREADHOLD) return
    if (appList.length >= total) return

    debouncedSetPage(page + 1)
  }

  return {
    appList,
    loading,
    scrollbarRef,
    handleScroll,
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
