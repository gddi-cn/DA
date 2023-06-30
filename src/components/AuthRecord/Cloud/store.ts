import { atom } from 'jotai'

import cloudAuthAPI from '@src/apis/cloudAuth';
import { atomWithRefresh } from "@src/utils/atomCreators"
import { modelVersionIdAtom } from '../store'

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

export const cloudAuthDataAtom = atomWithRefresh(async (get) => {
  const page = get(pageAtom)
  const page_size = get(pageSizeAtom)
  const model_id = get(modelVersionIdAtom)

  const { success, data } = await cloudAuthAPI.lsit({
    page,
    page_size,
    model_id
  })

  if (!success || !data) {
    return {
      total: 0,
      items: [],
    }
  }

  return { 
    total: data.total ?? 0,
    items: data.items ?? [],
  }
})

export const cloudAuthListAtom = atom(get => get(cloudAuthDataAtom).items)
export const cloudAuthTotalAtom = atom(get => get(cloudAuthDataAtom).total)
