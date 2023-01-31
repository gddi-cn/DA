import React from 'react'
import { useAtom } from 'jotai'

import { ApplicationScene } from '@src/shared/enum/application'
import { ChipConfigType } from '@src/shared/enum/chip'
import {
  brandListAtom,
  allChipListAtom,
  selectedChipAtom,
  applicationAtom,
  brandAtom,
  chipTypeAtom,
  nameAtom,
  fetchingChipAtom,
  cardNumAtom,
  configTypeAtom,
  configFpsAtom,
  configConcurrentAtom,
  maxFPSAtom,
  maxChannelAtom,
  MAX_FPS,
  MAX_CHANNEL,
} from './store'

export const useTrainConfig = () => {
  const [, setBrandList] = useAtom(brandListAtom)
  const [, setAllChipList] = useAtom(allChipListAtom)
  const [, setSelectedChip] = useAtom(selectedChipAtom)
  const [, setApplication] = useAtom(applicationAtom)
  const [, setBrand] = useAtom(brandAtom)
  const [, setChipType] = useAtom(chipTypeAtom)
  const [, setName] = useAtom(nameAtom)
  const [, setFetchingChip] = useAtom(fetchingChipAtom)
  const [, setCardNum] = useAtom(cardNumAtom)
  const [, setConfigType] = useAtom(configTypeAtom)
  const [, setConfigFps] = useAtom(configFpsAtom)
  const [, setConfigConcurrent] = useAtom(configConcurrentAtom)
  const [, setMaxFPS] = useAtom(maxFPSAtom)
  const [, setMaxChannel] = useAtom(maxChannelAtom)

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
        setMaxChannel(MAX_CHANNEL)
        setFetchingChip(false)
      }
    },
    []
  )  
}
