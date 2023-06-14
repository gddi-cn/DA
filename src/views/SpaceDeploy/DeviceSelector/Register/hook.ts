import { useAtomValue, useSetAtom } from 'jotai'

import { selectedDeviceGroupAtom, refreshDeviceListDataAtom } from '../store'
export const useRegister = () => {
  const defaultSelectedGroup = useAtomValue(selectedDeviceGroupAtom)
  const getDefaultGroup = () => defaultSelectedGroup
  const onRegist = useSetAtom(refreshDeviceListDataAtom)

  return {
    getDefaultGroup,
    onRegist,
  }
}
