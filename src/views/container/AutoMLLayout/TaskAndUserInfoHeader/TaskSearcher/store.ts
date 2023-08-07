import { DatasetScene } from '@src/shared/enum/dataset'
import { atom } from 'jotai'
import { Model } from '@src/shared/enum/model'
import {ChipOption} from "@src/shared/types/chip";

export const PAGE_SIZE = 20

// project filter
export const taskNameAtom = atom<string>('')
export const pageAtom = atom<number>(1)
export const modelTypeAtom = atom<DatasetScene | undefined>(undefined)
export const sortAtom = atom<'asc' | 'desc'>('desc')
export const orderAtom = atom<'created' | 'updated'>('updated')
export const statusAtom = atom<Model.TrainStatus | undefined>(undefined)
export const chipAtom = atom<ChipOption | undefined>(undefined)

export const taskListAtom = atom<Array<Project.Detail>>([]) 
export const totalAtom = atom<number>(0)
export const fetchingTaskListAtom = atom<boolean>(false)

export const fetchedAllAtom = atom(get => {
  const total = get(totalAtom)
  const page = get(pageAtom)

  return page * PAGE_SIZE >= total
})
