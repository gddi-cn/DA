import { GroupDevice } from '@src/shared/types/device'
import { useAtom } from 'jotai'
import React from 'react'
import { selectedDeviceListAtom } from '../../store'

export const useDeviceList = () => {
  const [deviceList] = useAtom(selectedDeviceListAtom)

  return {
    deviceList,
  }
}

export const useDeviceItem = (device: GroupDevice) => {
  const { id } = device || {}
  const [, setDeviceList] = useAtom(selectedDeviceListAtom)

  const handleRemove = () => {
    setDeviceList(x => x.filter(x => x.id !== id))
  }

  return {
    handleRemove,
  }
}

