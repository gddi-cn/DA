import { AppTemplateInput } from '@src/shared/enum/application'
import { atom } from 'jotai'
import React from 'react'
import { positionValues } from 'react-custom-scrollbars'
import { Space } from '../../../enums'
import { GroupDevice } from '@src/shared/types/device'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'

export const DEFAULT_PAGE_SIZE = 32

export const stepAtom = atom<Space.Deploy.Create.Step>(Space.Deploy.Create.Step.DEVICE)

export const deviceTypeAtom = atom<Device.Chip.Option | undefined>(undefined)

// ============================== APP List =====================================
export const appListAtom = atom<Array<App.Instance>>([])
export const appTotalAtom = atom<number>(0)
export const fetchingAppAtom = atom<boolean>(false)
export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

// app list filter
export const pageFilterAtom = atom<number>(1)
export const pageSizeFilterAtom = atom<number>(DEFAULT_PAGE_SIZE)
export const nameFilterAtom = atom<string | undefined>(undefined)
export const templateLabelListAtom = atom<Array<string>>([])
export const selectedTemplateLabelOptionAtom =
  atom<{ key: string, value: string, label: string } | null>(null)
export const templateInputAtom = 
  atom<{ key: string, value: AppTemplateInput, label: string } | undefined> (undefined)

export const listInitAtom = atom<boolean>(false)

export const scrollbarRefAtom =
  atom<React.MutableRefObject<{ getValues(): positionValues } | null> | undefined>(undefined)

export const selectedAppListAtom = atom<Array<App.Instance>>([])

// ============================== App List =====================================

// ============================== Device List =====================================
export const selectedDeviceListAtom = atom<Array<GroupDevice>>([])

export const selectedDeviceGroupAtom = atom<DeviceGroupOptions | null>(null)

export const deviceListAtom = atom<Array<GroupDevice>>([])

export const deviceNameAtom = atom<string>('')

export const devicePageAtom = atom<number>(1)

export const devicePageSizeAtom = atom<number>(10)

export const deviceTotalAtom = atom<number>(0)

export const fetchingDeviceAtom = atom<boolean>(false)
// ============================== Device List =====================================
