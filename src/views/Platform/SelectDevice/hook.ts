import React from 'react'
import { useAtom } from 'jotai'
import {
  fetchingGroupDeviceAtom,
  groupDeviceListAtom,
  groupDevicePageAtom,
  groupDevicePageSizeAtom,
  groupDeviceTotalAtom,
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
  const [page] = useAtom(groupDevicePageAtom)
  const [page_size] = useAtom(groupDevicePageSizeAtom)

  const groupId = selectedGroup?.value

  return async () => {
    if (loading) return

    if (!groupId) {
      setGroupDeviceList([])
      setGroupDeviceTotal(0)
      setSelectedDeviceIdList([])
      return
    }

    setLoading(true)
    const { success, data } = await deviceGroupAPI
      .fetchGroupDeviceList(
        groupId,
        {
          page,
          page_size,
          type: DeviceType.EDGE
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
      refreshDeviceList()
    },
    [groupId]
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
        setSelectedDeviceIdList([])
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
