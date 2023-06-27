import { atom, useSetAtom } from 'jotai'
import { atomWithRefresh } from "@src/utils/atomCreators";
import syncAPI from '@src/apis/sync';
import React from 'react';

export const filterAtom = atom({
  page: 1,
  pageSize: 20,
})

export const pageAtom = atom(
  get => get(filterAtom).page,
  (_, set, page: number) => set(filterAtom, (filter) => ({ ...filter, page }))
)
export const pageSizeAtom = atom(
  get => get(filterAtom).pageSize,
  (_, set, pageSize: number) => set(filterAtom, { page: 1, pageSize })
)

export const deployDataAtom = atomWithRefresh(async (get) => {
  const page = get(pageAtom)
  const page_size = get(pageSizeAtom)

  const { success, data } = await syncAPI.list({ page, page_size })

  if (!success || !data) {
    return {
      total: 0,
      items: []
    }
  }

  return {
    total: data.total ?? 0,
    items: data.items ?? []
  }
})

export const deployListAtom = atom(get => get(deployDataAtom).items)
export const deployTotalAtom = atom(get => get(deployDataAtom).total)

export const currentDeployAtom = atom<Sync.Instance | null>(null)
export const detailOpenAtom = atom<boolean>(false)

export const currentAppIdAtom = atom<App.Instance['id'] | null>(null)
export const currentPageAtom = atom<'app' | 'deploy'>('deploy')
