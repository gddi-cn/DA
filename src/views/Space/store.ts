import { atom } from 'jotai'
import { Space } from './enums'

export const currentPageAtom = atom<Space.Page>(Space.Page.USAGE)

export const usageAtom = atom<User.Usage | null>(null)

export const fetchingUsageAtom = atom<boolean>(false)
