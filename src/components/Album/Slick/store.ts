import { atom } from 'jotai'

import { dataListAtom } from '../store'

const pageSizeAtom = atom<number>(10)

const currentPageAtom = atom<number>(0)

const slickDataAtom = atom(get => {
  const currentPage = get(currentPageAtom)
  const pageSize = get(pageSizeAtom)
  const allData = get(dataListAtom)

  return allData.slice(0, (currentPage + 1) * pageSize)
})
