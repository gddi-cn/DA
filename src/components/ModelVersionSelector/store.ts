import { atom } from 'jotai'

export const currentVersionIdAtom = atom<Model.Version['id'] | undefined>(undefined)

export const versionListAtom = atom<Array<Model.Version>>([])

export const fetchingVersionList = atom<boolean>(false)
