import { atom } from 'jotai'

export const modelVersionIdAtom = atom<string | undefined>(undefined)

export const loadingAtom = atom<boolean>(false)

export const detailAtom = atom<Experience.Instance | null>(null)

export const creatingAtom = atom<boolean>(false)

export const cancelLoadingAtom = atom<boolean>(false)

export const leftTimeAtom = atom<number>(0)

export const leftHourAtom = atom<number>(get => {
  const leftTime = get(leftTimeAtom)

  if (leftTime <= 0) return 0

  return (leftTime / 3600) | 0
})

export const leftMinuteAtom = atom<number>(get => {
  const leftTime = get(leftTimeAtom)

  if (leftTime <= 0) return 0

  return ((leftTime % 3600) / 60) | 0
})
