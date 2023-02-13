import { atom } from 'jotai'
import { AppDetail } from './enums'

export const appAtom = atom<App.Instance | null>(null)

export const fetchingAppAtom = atom<boolean>(false)

export const currentPageAtom = atom<AppDetail.Page>(AppDetail.Page.INFO)

