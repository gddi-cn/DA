import { atom } from 'jotai'

export const PAGE_SIZE = 20

// project filter
export const taskNameAtom = atom<string>('')
export const pageAtom = atom<number>(1)

export const taskListAtom = atom<Array<Project.Detail>>([]) 
export const totalAtom = atom<number>(0)
export const fetchingTaskListAtom = atom<boolean>(false)

export const fetchedAllAtom = atom(get => {
  const total = get(totalAtom)
  const page = get(pageAtom)

  return page * PAGE_SIZE >= total
})
