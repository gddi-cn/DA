import { DeviceRegisterResult } from '@src/shared/types/device'
import { atom, useSetAtom } from 'jotai'
import React from 'react'

export const stepAtom = atom<'device' | 'reg_res'>('device')

export const registerResultAtom = atom<Array<DeviceRegisterResult>>([])

export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

export const useResetStore = () => {
  const setDeviceTypeList = useSetAtom(deviceTypeListAtom)

  React.useEffect(
    () => () => {
      setDeviceTypeList([])
    },
    []
  )
}