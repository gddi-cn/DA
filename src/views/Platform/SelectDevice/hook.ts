import React from 'react'
import { useAtom } from 'jotai'
import {
  fetchingGroupDeviceAtom,
  groupDeviceListAtom,
  groupDevicePageAtom,
  groupDevicePageSizeAtom,
  groupDeviceTotalAtom,
  modelVersionIdAtom,
  selectedAppAtom,
  selectedDeviceGroupAtom, selectedDeviceIdListAtom
} from '../store'
import deviceGroupAPI from '@src/apis/deviceGroups'
import { DeviceType } from '@src/shared/enum/device'
import { GroupDevice } from '@src/shared/types/device'

const useRefreshDeviceList = () => {
  const [selectedGroup] = useAtom(selectedDeviceGroupAtom)
  const [, setGroupDeviceList] = useAtom(groupDeviceListAtom)
  const [, setGroupDeviceTotal] = useAtom(groupDeviceTotalAtom)
  const [, setSelectedDeviceIdList] = useAtom(selectedDeviceIdListAtom)
  const [loading, setLoading] = useAtom(fetchingGroupDeviceAtom)
  const [page, setPage] = useAtom(groupDevicePageAtom)
  const [page_size] = useAtom(groupDevicePageSizeAtom)
  const [selectedApp] = useAtom(selectedAppAtom)

  const groupId = selectedGroup?.value

  return async (firstPage?: boolean) => {
    if (loading) return
    if (!selectedApp?.id) return

    if (!groupId && groupId !== 0) {
      setGroupDeviceList([])
      setGroupDeviceTotal(0)
      setSelectedDeviceIdList([])
      return
    }

    setLoading(true)
    firstPage && setPage(1)
    const { success, data } = await deviceGroupAPI
      .fetchGroupDeviceList(
        groupId,
        {
          page,
          page_size,
          type: DeviceType.EDGE,
          app_id: selectedApp.id + '',
        }
      )
    setLoading(false)

    if (!success || !data) {
      setGroupDeviceList([])
      setGroupDeviceTotal(0)
      setSelectedDeviceIdList([])
      return
    }

    setGroupDeviceList(data.items || [])
    setGroupDeviceTotal(data.total || 0)
    setSelectedDeviceIdList([])
  }
}

export const useSelectDevice = () => {
  const [group, setGroup] = useAtom(selectedDeviceGroupAtom)
  const [deviceList, setDeviceList] = useAtom(groupDeviceListAtom)
  const [page, setPage] = useAtom(groupDevicePageAtom)
  const [pageSize, setPageSize] = useAtom(groupDevicePageSizeAtom)
  const [total] = useAtom(groupDeviceTotalAtom)
  const [loading, setLoading] = useAtom(fetchingGroupDeviceAtom)
  const [, setTotal] = useAtom(groupDeviceTotalAtom)
  const [, setSelectedDeviceIdList] = useAtom(selectedDeviceIdListAtom)

  const groupId = group?.value

  const refreshDeviceList = useRefreshDeviceList()

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleSelectedChange = (idList: Array<GroupDevice['id']>) => {
    setSelectedDeviceIdList(idList)
  }

  React.useEffect(
    () => {
      refreshDeviceList(true)
    },
    [groupId, pageSize]
  )

  React.useEffect(
    () => {
      refreshDeviceList()
    },
    [page]
  )

  React.useEffect(
    () => {
      return () => {
        setLoading(true)
        setGroup(null)
        setDeviceList([])
        setPage(1)
        setPageSize(10)
        setTotal(0)
        setLoading(false)
      }
    },
    []
  )

  return {
    deviceList,
    page,
    pageSize,
    handlePaginationChange,
    total,
    loading,
    handleSelectedChange,
  }
}
