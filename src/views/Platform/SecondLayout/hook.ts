import React from 'react'
import { useAtom } from 'jotai'
import { currentStepAtom, selectedAppAtom, selectedDeviceGroupAtom } from '../store'
import { formatUnixDate } from '@src/utils/tools'
import { Platform } from '@views/Platform/enum'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'

export const useSecondLayout = () => {
  const [currentStep] = useAtom(currentStepAtom)

  const showConfig = currentStep === Platform.Step.CONFIG
  const showSelectDevice = currentStep === Platform.Step.SELECT_DEVICE

  return {
    showConfig,
    showSelectDevice,
  }
}

export const useMeta = () => {
  const [selectedApp] = useAtom(selectedAppAtom)

  const {
    name,
    cover,
    create_time,
    adapter_device,
  } = selectedApp || {}

  const created = create_time ? formatUnixDate(create_time) : '-'

  return {
    name,
    cover,
    created,
    adapter_device,
  }
}

export const useDeviceGroupSelector = () => {
  const [currentStep] = useAtom(currentStepAtom)
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useAtom(selectedDeviceGroupAtom)

  const show = currentStep === Platform.Step.SELECT_DEVICE

  const onFirstLoad = React.useCallback((o: any[]) => {
    const [defaultGroup] = o.filter(x => x.value === 0)
    setSelectedDeviceGroup(defaultGroup || null)
  }, [])

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null)
  }

  return {
    show,
    selectedDeviceGroup,
    onFirstLoad,
    handleChange,
  }
}
