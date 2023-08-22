import React from 'react'
import { atom, useSetAtom } from 'jotai'

import { ChipConfigType } from '@src/shared/enum/chip'
import { ChipListParams } from '@src/shared/types/chip'
import { ApplicationScene } from '@src/shared/enum/application'
import { currentDatasetAtom } from '@src/store/dataset'

export const MAX_FPS = 30
// export const MAX_CHANNEL = 32

export const brandListAtom = atom<Array<Chip.Brand>>([])

export const allChipListAtom = atom<Array<Chip.Instance>>([])
export const hotChipListAtom = atom<Array<Chip.Instance>>(
  (get) => get(allChipListAtom).filter(x => x.is_hot).map(x => ({ ...x, _copy: true }))
)

export const selectedChipAtom = atom<Chip.Instance | undefined>(undefined)


// chip list filter
export const applicationAtom = atom<ChipListParams['application']>(ApplicationScene.ENDPOINT)
export const brandAtom = atom<Chip.Brand | undefined>(undefined)
export const chipTypeAtom = atom<ChipListParams['chip_type']>(undefined)
export const nameAtom = atom<ChipListParams['name']>(undefined)

export const fetchingChipAtom = atom<boolean>(false)

// Train Setting
export const cardNumAtom = atom<number>(1)
export const configTypeAtom = atom<ChipConfigType>(ChipConfigType.RECOMMEND)
export const configFpsAtom = atom<number>(25)
export const configConcurrentAtom = atom<number>(1)

export const maxFPSAtom = atom<number>(MAX_FPS)
export const maxChannelAtom = atom<number>(16)

export const resolutionLimitAtom = atom<number>(get => {
  const chip = get(selectedChipAtom)
  return chip?.resolution_limited ?? 0
})

// 默认分辨率
// 1. 如果分辨率列表为空，返回0
// 2. 如果分辨率列表第一个值小于等于限制值，返回第一个值
// 3. 如果分辨率列表第一个值大于限制值，返回小于等于限制值的最大值
// 4. 如果分辨率列表中没有小于等于限制值的值，返回0
export const defaultResolutionAtom = atom<number>(get => {
  const limit = get(resolutionLimitAtom)
  const dataset = get(currentDatasetAtom)
  const list = dataset?.resolution ?? []

  if (!list.length) return 0;

  let defaultResolution = list[0]

  if (defaultResolution > limit) {
    const sortedList = [...list].sort((a, b) => b - a)
    defaultResolution = sortedList.find(x => x <= limit) ?? 0
  }

  return defaultResolution
})

export const resolutionAtom = atom<number>(0)

export const resolutionListAtom = atom<Array<number>>(get => {
  const dataset = get(currentDatasetAtom)
  const list = dataset?.resolution ?? [] as number[]

  return [...list].sort((a, b) => a - b)
})

export const useResetStore = () => {
  const setBrandList = useSetAtom(brandListAtom)
  const setAllChipList = useSetAtom(allChipListAtom)
  const setSelectedChip = useSetAtom(selectedChipAtom)
  const setApplication = useSetAtom(applicationAtom)
  const setBrand = useSetAtom(brandAtom)
  const setChipType = useSetAtom(chipTypeAtom)
  const setName = useSetAtom(nameAtom)
  const setFetchingChip = useSetAtom(fetchingChipAtom)
  const setCardNum = useSetAtom(cardNumAtom)
  const setConfigType = useSetAtom(configTypeAtom)
  const setConfigFps = useSetAtom(configFpsAtom)
  const setConfigConcurrent = useSetAtom(configConcurrentAtom)
  const setMaxFPS = useSetAtom(maxFPSAtom)
  const setMaxChannel = useSetAtom(maxChannelAtom)

  React.useEffect(
    () => {
      return () => {
        setFetchingChip(true)
        setBrandList([])
        setAllChipList([])
        setSelectedChip(undefined)
        setApplication(ApplicationScene.ENDPOINT)
        setBrand(undefined)
        setChipType(undefined)
        setName(undefined)
        setCardNum(1)
        setConfigType(ChipConfigType.RECOMMEND)
        setConfigFps(25)
        setConfigConcurrent(1)
        setMaxFPS(MAX_FPS)
        setMaxChannel(16)
        setFetchingChip(false)
      }
    },
    []
  )
}
