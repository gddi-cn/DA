import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import {
  deviceListSortAtom,
  deviceListSortByAtom,
  fetchingGroupDeviceAtom,
  groupDeviceListAtom,
  groupDevicePageAtom,
  groupDevicePageSizeAtom,
  groupDeviceTotalAtom,
  selectedAppAtom,
  selectedDeviceGroupAtom,
  selectedDeviceIdListAtom,
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
  const sort = useAtomValue(deviceListSortAtom)
  const sort_by = useAtomValue(deviceListSortByAtom)

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
          sort,
          sort_by,
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
  const [sort, setSort] = useAtom(deviceListSortAtom)
  const [sortBy, setSortBy] = useAtom(deviceListSortByAtom)

  const groupId = group?.value

  const refreshDeviceList = useRefreshDeviceList()

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleSelectedChange = (idList: Array<GroupDevice['id']>) => {
    setSelectedDeviceIdList(idList)
  }

  const handleSorterChange = (name: string, order?: 'ascend' | 'descend') => {
    let sort: 'asc' | 'desc' = 'desc',
      sort_by: 'name' | 'registered_time' = 'registered_time';

    if (name === 'name' && !!order) {
      sort_by = 'name'
    }

    if (name === 'create_time' && !!order) {
      sort_by = 'registered_time'
    }

    if (order === 'ascend') {
      sort = 'asc'
    }

    if (order === 'descend') {
      sort = 'desc'
    }

    setSort(sort)
    setSortBy(sort_by)
  }

  React.useEffect(
    () => {
      refreshDeviceList(true)
    },
    [groupId, pageSize, sort, sortBy]
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
    total,
    loading,
    handlePaginationChange,
    handleSelectedChange,
    handleSorterChange,
  }
}
