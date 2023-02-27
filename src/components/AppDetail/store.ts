import { atom } from 'jotai'
import React from 'react'
import { AppDetail } from './enums'

export const appAtom = atom<App.Instance | null>(null)

export const fetchingAppAtom = atom<boolean>(false)

export const currentPageAtom = atom<AppDetail.Page>(AppDetail.Page.INFO)

export const deployRecordListAtom = atom<Sync.Instance[]>([])

export const fetchingRecordAtom = atom<boolean>(false)

export const onDeleteRefAtom =
  atom<React.MutableRefObject<(() => void) | undefined> | undefined>(undefined)

export const onCloseRefAtom =
  atom<React.MutableRefObject<(() => void) | undefined> | undefined>(undefined)

export const currentRecordAtom = atom<Sync.Instance | undefined>(undefined)

