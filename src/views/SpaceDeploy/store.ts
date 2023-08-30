import { atom, useSetAtom } from 'jotai'
import { Deploy } from './enums'
import { useResetAppSelectorStore } from './AppSelector/store'
import { useResetDeviceStore } from './DeviceSelector/store'

export const currentStepAtom = atom<Deploy.Step>(Deploy.Step.APP)

export const selectedAppListAtom = atom<App.Instance[]>([])

export const selectedChipAtom = atom<Device.Chip.Instance['key'] | null>(null)

export const selectedDeviceListAtom = atom<GroupDevice.Instance[]>([])

// ================================ Config ========================================
export const noExpireAtom = atom<boolean>(true)
export const expireAtom = atom<number>(-1)
export const limitAtom = atom<number>(1)
// ================================ Config ========================================

export const useResetDeployStore = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)
  const setSelectedAppList = useSetAtom(selectedAppListAtom)
  const setSelectedChip = useSetAtom(selectedChipAtom)
  const setSelectedDeviceIdList = useSetAtom(selectedDeviceListAtom)
  const setNoExpire = useSetAtom(noExpireAtom)
  const setExpire = useSetAtom(expireAtom)
  const setLimit = useSetAtom(limitAtom)
  const resetAppSelectorStore = useResetAppSelectorStore()
  const resetDeviceStore = useResetDeviceStore()

  return () => {
    setCurrentStep(Deploy.Step.APP)
    setSelectedAppList([])
    setSelectedChip(null)
    setSelectedDeviceIdList([])
    setNoExpire(true)
    setExpire(-1)
    setLimit(1)
    resetAppSelectorStore()
    resetDeviceStore()
  }
}
