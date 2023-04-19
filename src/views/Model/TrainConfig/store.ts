import { atom } from 'jotai'

import { ChipBrand, ChipConfigType } from '@src/shared/enum/chip'
import { Chip, ChipListParams } from '@src/shared/types/chip'
import { ApplicationScene } from '@src/shared/enum/application'
import { currentDatasetAtom } from '@src/store/dataset'

export const MAX_FPS = 30
export const MAX_CHANNEL = 16

export const brandListAtom = atom<Array<ChipBrand>>([])

export const allChipListAtom = atom<Array<Chip>>([])
export const hotChipListAtom = atom<Array<Chip>>(
  (get) => get(allChipListAtom).filter(x => x.is_hot).map(x => ({ ...x, _copy: true }))
)

export const selectedChipAtom = atom<Chip | undefined>(undefined)


// chip list filter
export const applicationAtom = atom<ChipListParams['application']>(ApplicationScene.ENDPOINT)
export const brandAtom = atom<ChipListParams['brand']>(undefined)
export const chipTypeAtom = atom<ChipListParams['chip_type']>(undefined)
export const nameAtom = atom<ChipListParams['name']>(undefined)

export const fetchingChipAtom = atom<boolean>(false)

// Train Setting
export const cardNumAtom = atom<number>(1)
export const configTypeAtom = atom<ChipConfigType>(ChipConfigType.RECOMMEND)
export const configFpsAtom = atom<number>(25)
export const configConcurrentAtom = atom<number>(1)

export const maxFPSAtom = atom<number>(MAX_FPS)
export const maxChannelAtom = atom<number>(MAX_CHANNEL)

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
    const sortedList = list.sort((a, b) => b - a)
    defaultResolution = sortedList.find(x => x <= limit) ?? 0
  }

  return defaultResolution
})

export const resolutionAtom = atom<number>(0)

export const resolutionListAtom = atom<Array<number>>(get => {
  const dataset = get(currentDatasetAtom)
  const list = dataset?.resolution ?? [] as number[]

  return list.sort((a, b) => b - a)
})
