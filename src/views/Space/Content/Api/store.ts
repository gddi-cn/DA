import { atom, useSetAtom } from 'jotai'
import React from 'react'

export const defaultParams: API.SearchParams = { page: 1, page_size: 20 }

export const paramsAtom = atom<API.SearchParams>({ ...defaultParams })

export const fetchingAtom = atom<boolean>(true)

export const deletingAtom = atom<boolean>(false)

export const totalAtom = atom<number>(0)

export const apiListAtom = atom<API.Instance[]>([])

export const deleteDialogOpenAtom = atom<boolean>(false)

export const createDialogOpenAtom = atom<boolean>(false)

export const currentDeleteItemAtom = atom<API.Instance | null>(null)

export const useResetStore = () => {
  const setParams = useSetAtom(paramsAtom)
  const setFetching = useSetAtom(fetchingAtom)
  const setDeleting = useSetAtom(deletingAtom)
  const setTotal = useSetAtom(totalAtom)
  const setApiList = useSetAtom(apiListAtom)
  const setDeleteDialogOpen = useSetAtom(deleteDialogOpenAtom)
  const setCreateDialogOpen = useSetAtom(createDialogOpenAtom)
  const setCurrentDeleteItem = useSetAtom(currentDeleteItemAtom)

  React.useEffect(
    () => () => {
      setParams({ ...defaultParams })
      setFetching(true)
      setDeleting(false)
      setTotal(0)
      setApiList([])
      setDeleteDialogOpen(false)
      setCreateDialogOpen(false)
      setCurrentDeleteItem(null)
    },
    []
  )
}
