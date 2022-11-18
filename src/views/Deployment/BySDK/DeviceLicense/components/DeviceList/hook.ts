import React from 'react'
import { useAtom } from 'jotai'

import { LicensedDevice } from '@src/shared/types/device'
import { deviceDialogOpenAtom, deviceListPageAtom, devicesAtom, deviceTotalAtom, PAGE_SIZE } from './store'


export const useDeviceList = (devices: Array<LicensedDevice>) => {
  const [page, setPage] = useAtom(deviceListPageAtom)
  const [, setDevice] = useAtom(devicesAtom)
  const [open, setOpen] = useAtom(deviceDialogOpenAtom)
  const [, setTotal] = useAtom(deviceTotalAtom)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  React.useEffect(
    () => {
      setTotal(devices.length)
      setDevice(devices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
    },
    [devices, page]
  )

  return {
    open,
    openDialog,
    closeDialog,
  }
}