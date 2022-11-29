import { atom } from 'jotai'

import { ChipBrand, ChipConfigType } from '@src/shared/enum/chip'
import { Chip, ChipListParams } from '@src/shared/types/chip'
import { ApplicationScene } from '@src/shared/enum/application'

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