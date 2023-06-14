import apiKeyAPI from '@src/apis/apiKey'
import { atom } from 'jotai'
import { atomWithDefault } from 'jotai/utils'

export const pageAtom = atom(1)
export const pageSizeAtom = atom(20)

const apiKeyResAtom = atomWithDefault(async (get) => {
  const page: number = get(pageAtom)
  const page_size: number = get(pageSizeAtom)

  const { success, data } = await apiKeyAPI.list({ page, page_size })

  if (!success || !data) return {
    total: 0,
    items: []
  }

  return {
    total: data.total ?? 0,
    items: data.items ?? [],
  }
})

export const refreshApiKeyAtom = atom(null, async (get, set) => {
  const page: number = get(pageAtom)
  const page_size: number = get(pageSizeAtom)

  const { success, data } = await apiKeyAPI.list({ page, page_size })

  if (!success || !data) {
    set(apiKeyResAtom, { total: 0, items: [] })
    return
  }

  set(apiKeyResAtom, {
    total: data.total ?? 0,
    items: data.items ?? [],
  })
})


export const apiKeyListAtom = atom((get) => {
  const res = get(apiKeyResAtom)
  return res.items as Array<APIKey.Instance>
})

export const apiKeyTotalAtom = atom((get) => {
  const res = get(apiKeyResAtom)
  return res.total as number
})

export const deleteDialogOpenAtom = atom<boolean>(false)

export const currentAPIKeyAtom = atom<APIKey.Instance | null>(null)

