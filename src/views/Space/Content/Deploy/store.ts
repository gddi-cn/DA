import { atom } from 'jotai'
import { Space } from '../../enums'

export const syncListAtom = atom<Array<Sync.Instance>>([])

export const syncListPageAtom = atom<number>(1)

export const syncListPageSizeAtom = atom<number>(20)

export const syncListTotalAtom = atom<number>(0)

export const fetchingSyncListAtom = atom<boolean>(false)

export const currentPageAtom = atom<Space.Deploy.Page>(Space.Deploy.Page.LIST)

export const currentSyncAtom = atom<Sync.Instance | undefined>(undefined)

export const fetchingSyncAtom = atom<boolean>(false)

export const currentAppIdAtom = atom<App.Instance['id'] | undefined>(undefined)

