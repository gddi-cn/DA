import { DatasetClass } from '@src/shared/types/dataset'
import { atom } from 'jotai'

export const classListAtom = atom<Array<DatasetClass>>([])
export const classPageAtom = atom<number>(0)
export const classPageSizeAtom = atom<number>(20)
export const classTotalAtom = atom<number>(get => get(classListAtom).length)
export const hasMoreAtom = atom<boolean>(get => {
  const page = get(classPageAtom)
  const pageSize = get(classPageSizeAtom)
  const total = get(classTotalAtom)
  return page * pageSize < total
})
export const showClassListAtom = atom<Array<DatasetClass>>(get => {
  const classList = get(classListAtom)
  const page = get(classPageAtom)
  const pageSize = get(classPageSizeAtom)

  return classList.slice(0, page * pageSize)
})
