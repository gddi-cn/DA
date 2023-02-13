import { AppTemplateInput } from '@src/shared/enum/application'
import { atom } from 'jotai'
import { Space } from '../../enums'

export const currentPageAtom = atom<Space.App.Page>(Space.App.Page.LIST)
export const currentAppIdAtom = atom<App.Instance['id'] | undefined>(undefined)

// ============================== List =====================================
export const appListAtom = atom<Array<App.Instance>>([])
export const appTotalAtom = atom<number>(0)
export const fetchingAppAtom = atom<boolean>(false)
export const deviceTypeListAtom = atom<Device.Chip.Instance[]>([])

// app list filter
export const pageFilterAtom = atom<number>(1)
export const pageSizeFilterAtom = atom<number>(32)
export const nameFilterAtom = atom<string | undefined>(undefined)
export const selectedDeviceTypeAtom = atom<Device.Chip.Option | null>(null)
export const templateLabelListAtom = atom<Array<string>>([])
export const selectedTemplateLabelOptionAtom =
  atom<{ key: string, value: string, label: string } | null>(null)
export const templateInputAtom = 
  atom<{ key: string, value: AppTemplateInput, label: string } | undefined> (undefined)

// ============================== List =====================================
