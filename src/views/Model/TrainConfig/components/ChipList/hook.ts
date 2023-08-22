import { useAtom, useAtomValue } from 'jotai'
import {
  allChipListAtom,
  applicationAtom,
  brandAtom,
  chipTypeAtom,
  configConcurrentAtom,
  configFpsAtom,
  configTypeAtom,
  fetchingChipAtom,
  MAX_FPS, maxChannelAtom,
  maxFPSAtom,
  nameAtom,
  selectedChipAtom,
  brandListAtom,
} from '@views/Model/TrainConfig/store'
import React from 'react'
import chipAPI from '@src/apis/chip'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer'
import { ChipConfigType } from '@src/shared/enum/chip'
import { ModelTrainMode } from '@src/shared/enum/model'

export const useChipList = () => {
  const [application] = useAtom(applicationAtom)
  const [brand] = useAtom(brandAtom)
  const [chip_type] = useAtom(chipTypeAtom)
  const [name] = useAtom(nameAtom)
  const [allChip, setAllChip] = useAtom(allChipListAtom)
  const [selectedChip, setSelectedChip] = useAtom(selectedChipAtom)
  const [configType, setConfigType] = useAtom(configTypeAtom)
  const [fps, setFps] = useAtom(configFpsAtom)
  const [channel, setConcurrent] = useAtom(configConcurrentAtom)
  const [, setMaxFPS] = useAtom(maxFPSAtom)
  const [maxChannel, setMaxChannel] = useAtom(maxChannelAtom)

  const [loading, setLoading] = useAtom(fetchingChipAtom)

  const task_type = useSelector((state: RootState) =>
    state.tasksSilce?.activePipeLine?.APP_DATA_SET_INDEX?.scene
  )

  const fetchRecommendConfig = () => {
    if (!selectedChip || !task_type) return

    const { name, chip_type, brand } = selectedChip

    chipAPI
      .fetchRecommendConfig(application, { task_type, chip_type, name, mode: ModelTrainMode.ACC, brand })
      .then(({ success, data }) => {
        if (!success || !data) {
          setFps(5)
          setConcurrent(1)
          return
        }

        const fps = data.fps || 5
        const channel = data.channel || 1

        setFps(Math.min(fps, MAX_FPS))
        setConcurrent(Math.min(channel, maxChannel))
      })
  }

  React.useEffect(() => {
    if (loading) return
    setLoading(true)

    chipAPI
      .chipList({ application, brand: brand?.name, chip_type, name, task_type })
      .then(({ success, data }) => {
        if (!success || !data?.length) return setAllChip([])
        setAllChip(data)
      })
      .finally(() => {
        setSelectedChip(undefined)
        setLoading(false)
      })
  }, [application, brand, chip_type, name, task_type])

  React.useEffect(
    () => {
      configType === ChipConfigType.RECOMMEND && fetchRecommendConfig()
    },
    [configType]
  )

  React.useEffect(
    () => {
      // 切换芯片时改为推荐配置并获取对应的推荐配置
      configType === ChipConfigType.RECOMMEND && fetchRecommendConfig()
      setConfigType(ChipConfigType.RECOMMEND)

      // 选中的芯片改变且选中芯片时修改配置的帧率和并行最大值
      if (!selectedChip) return
      const { fps_limited, channel_limited } = selectedChip

      const maxFPS = Math.min(MAX_FPS, fps_limited)
      setMaxFPS(maxFPS)
      setMaxChannel(channel_limited)

      // 当前值超出最大值改到最大值
      fps > maxFPS && setFps(maxFPS)
      channel > channel_limited && setConcurrent(channel_limited)
    },
    [selectedChip]
  )

  return {
    noData: allChip.length <= 0,
    loading
  }
}

export const useChip = (chip: Chip.Instance) => {
  const { logo, brand } = chip
  const [brandLogo, setBrandLogo] = React.useState<string | undefined>(undefined)
  const brandList = useAtomValue(brandListAtom)
  const chipContainerRef = React.useRef<HTMLDivElement | null>(null)

  const [selectedChip, setSelectedChip] = useAtom(selectedChipAtom)

  const selected =
    (selectedChip?.name === chip.name)
    && (selectedChip?.chip_type === chip.chip_type)
    && (selectedChip?._copy === chip._copy)

  const handleClick = () => {
    if (selected) return setSelectedChip(undefined)
    setSelectedChip(chip)
  }

  React.useEffect(
    () => {
      const $c = chipContainerRef.current

      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  React.useEffect(
    () => {
      const idx = brandList.findIndex(x => x.name === brand)
      if (idx < 0) {
        setBrandLogo(undefined)
        return
      }

      setBrandLogo(brandList[idx].logoSlim)
    },
    [brand, brandList]
  )


  return {
    chipContainerRef,
    handleClick,
    logo,
    brandLogo,
  }
}
