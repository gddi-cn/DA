import React from 'react'
import { useAtom } from 'jotai'
import { groupDeviceAtom, selectedDeviceGroupAtom } from './store'

export const useApply = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return {
    open,
    openDialog,
    closeDialog,
  }
}

export const useGroupDevice = () => {
  const [group] = useAtom(selectedDeviceGroupAtom)
  const [, setDeviceList] = useAtom(groupDeviceAtom)

  React.useEffect(
    () => {
      
    },
    [group?.id]
  )
}