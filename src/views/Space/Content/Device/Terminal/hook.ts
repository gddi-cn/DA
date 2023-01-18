import { useAtom } from 'jotai'
import _ from 'lodash'

import {
  fetchingTerminalAtom,
  selectedTerminalGroupAtom, selectedTerminalDeviceIdListAtom,
  terminalDeviceListAtom,
  terminalNameAtom,
  terminalPageAtom,
  terminalPageSizeAtom,
  terminalTotalAtom,
} from '@views/Space/Content/Device/store'
import deviceGroupAPI from '@src/apis/deviceGroups'
import React from 'react'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { DeviceType } from '@src/shared/enum/device'
import { GroupDevice } from '@src/shared/types/device'
import { message } from 'antd'

const useRefreshTerminalDevice = () => {
  const [group] = useAtom(selectedTerminalGroupAtom)
  const [name] = useAtom(terminalNameAtom)
  const [, setList] = useAtom(terminalDeviceListAtom)
  const [page] = useAtom(terminalPageAtom)
  const [page_size] = useAtom(terminalPageSizeAtom)
  const [, setTTotal] = useAtom(terminalTotalAtom)
  const [loading, setLoading] = useAtom(fetchingTerminalAtom)
  const [, setSelectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)

  const groupId = group?.value

  return async () => {
    if (groupId !== 0 && !groupId)
      return

    if (loading)
      return

    setLoading(true)
    const { success, data } = await deviceGroupAPI.fetchGroupDeviceList(groupId, {
      name,
      page,
      page_size,
      type: DeviceType.TERMINAL,
    })
    setLoading(false)

    setSelectedDeviceIdList([])

    if (!success || !data) {
      setTTotal(0)
      setList([])
      return
    }

    setTTotal(data.total || 0)
    setList(data.items || [])
  }
}

export const useTerminal = () => {
  const [group] = useAtom(selectedTerminalGroupAtom)
  const [name] = useAtom(terminalNameAtom)
  const [page, setPage] = useAtom(terminalPageAtom)
  const [page_size, setPageSize] = useAtom(terminalPageSizeAtom)
  const [selectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)
  const [deviceList] = useAtom(terminalDeviceListAtom)
  const [loading] = useAtom(fetchingTerminalAtom)
  const [total] = useAtom(terminalTotalAtom)

  const groupId = group?.value

  const refresh = useRefreshTerminalDevice()

  const handleChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  React.useEffect(() => {
    refresh()
  }, [groupId, name, page, page_size])

  return {
    page,
    pageSize: page_size,
    total,
    handleChange,
    showOperations: selectedDeviceIdList?.length > 0,
    showDeleteGroup: deviceList.length <= 0,
    loading,
  }
}

export const useNameFilter = () => {
  const [, setName] = useAtom(terminalNameAtom)
  const [localName, setLocalName] = React.useState<string>('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalName(e.target.value)
  }

  const debouncedSetName = React.useMemo(() => _.debounce(setName, 200), [])

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


export const useDeviceGroupSelector = () => {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(selectedTerminalGroupAtom)

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter(x => x.value === 0)
    setSelectedDeviceGroup(defaultGroup || null)
  }, [])

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null)
  }

  return {
    selectedDeviceGroup,
    onFirstLoad,
    handleChange,
  }
}

export const useTerminalList = () => {
  const [dataSource] = useAtom(terminalDeviceListAtom)
  const [loading] = useAtom(fetchingTerminalAtom)
  const [, setSelectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)

  const handleSelectedChange = (idList: Array<GroupDevice['id']>) => {
    setSelectedDeviceIdList(idList)
  }

  return {
    showNoData: !dataSource.length,
    loading,
    dataSource,
    handleSelectedChange,
  }
}


export const useMoveDevice = () => {
  const [selectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [sourceGroupOptions] = useAtom(selectedTerminalGroupAtom)
  const [targetGroupOptions, setTargetGroupOptions] = React.useState<DeviceGroupOptions | null>(null)

  const sourceGroupId = sourceGroupOptions?.value
  const targetGroupId = targetGroupOptions?.value

  const refresh = useRefreshTerminalDevice()

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter(x => x.value === 0)
    setTargetGroupOptions(defaultGroup || null)
  }, [])

  const handleChange = (value?: DeviceGroupOptions) => {
    setTargetGroupOptions(value || null)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleMove = () => {
    if (loading) return
    if (!selectedDeviceIdList.length) return
    if ((sourceGroupId !== 0 && !sourceGroupId) || (targetGroupId !== 0 && !targetGroupId)) return

    setLoading(true)
    Promise.all(
      selectedDeviceIdList
      .map(id => deviceGroupAPI.moveDevice(id, sourceGroupId, targetGroupId))
    ).then(resList => {
      setLoading(false)
      const success = resList.every(x => x.success)

      if (success) {
        message.success('移动成功')
      }


      refresh()
    })
  }

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    targetGroupOptions,
    onFirstLoad,
    handleChange,
    handleMove,
  }
}

export const useCopyDevice = () => {
  const [selectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [sourceGroupOptions] = useAtom(selectedTerminalGroupAtom)
  const [targetGroupOptions, setTargetGroupOptions] = React.useState<DeviceGroupOptions | null>(null)

  const sourceGroupId = sourceGroupOptions?.value
  const targetGroupId = targetGroupOptions?.value

  const refresh = useRefreshTerminalDevice()

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter(x => x.value === 0)
    setTargetGroupOptions(defaultGroup || null)
  }, [])

  const handleChange = (value?: DeviceGroupOptions) => {
    setTargetGroupOptions(value || null)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleCopy = () => {
    if (loading) return
    if (!selectedDeviceIdList.length) return
    if ((sourceGroupId !== 0 && !sourceGroupId) || (targetGroupId !== 0 && !targetGroupId)) return

    setLoading(true)
    Promise.all(
      selectedDeviceIdList
      .map(id => deviceGroupAPI.copyDevice(id, sourceGroupId, targetGroupId))
    ).then(resList => {
      setLoading(false)
      const success = resList.every(x => x.success)

      if (success) {
        message.success('复制成功')
      }

      refresh()
    })
  }

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    targetGroupOptions,
    onFirstLoad,
    handleChange,
    handleCopy,
  }
}

export const useUnregister = () => {
  const [selectedDeviceIdList] = useAtom(selectedTerminalDeviceIdListAtom)
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [groupOptions] = useAtom(selectedTerminalGroupAtom)

  const refresh = useRefreshTerminalDevice()

  const groupId = groupOptions?.value

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleUnregister = () => {
    if (loading) return
    if (groupId !== 0 && !groupId) return
    if (!selectedDeviceIdList.length) return

    setLoading(true)
    Promise.all(
      selectedDeviceIdList.map(id => deviceGroupAPI.unregister(id, groupId))
    ).then(resList => {
      setLoading(false)
      const success = resList.every(x => x.success)

      if (success) {
        message.success('注销成功')
      }

      refresh()
    })
  }

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    handleUnregister,
  }
}

export const useDeleteGroup = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [groupOptions, setGroupOptions] = useAtom(selectedTerminalGroupAtom)

  const groupId = groupOptions?.value

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleDeleteGroup = async () => {
    if (loading) return
    if (!groupId) return

    setLoading(true)
    const { success } = await deviceGroupAPI.delete(groupId)
    setLoading(false)

    if (success) {
      message.success('删除成功')
    }

    setGroupOptions({ key: 0, value: 0, label: '默认组' })
  }

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    handleDeleteGroup,
    show: groupId && groupId !== 0,
  }
}
