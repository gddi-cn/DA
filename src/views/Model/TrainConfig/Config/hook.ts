import React from 'react'
import {useAtom, useAtomValue} from 'jotai'

import {
  cardNumAtom,
  clipAtom,
  configConcurrentAtom,
  configFpsAtom,
  configTypeAtom,
  defaultResolutionAtom,
  maxChannelAtom,
  maxFPSAtom,
  resolutionAtom,
  resolutionLimitAtom,
  resolutionListAtom,
  selectedChipAtom,
  showClipAtom,
  supportClipAtom
} from '../store'
import {message, RadioChangeEvent} from 'antd'
import {ChipConfigType} from '@src/shared/enum/chip'
import {RootState} from '@reducer'
import {useSelector} from 'react-redux'
import {SwitchChangeEventHandler} from "antd/es/switch";
import {useFetchRecommendConfig} from "@views/Model/TrainConfig/hook";

const MAX_TIP = '您当前的训练配额卡数是 {cardLimit} 个，想升级服务请联系客服。'
const PENDING_TIP = '当前选择卡数较大，可能需要较长时间等待训练'

export const useResolution = () => {
  const limit = useAtomValue(resolutionLimitAtom),
    defaultResolution = useAtomValue(defaultResolutionAtom),
    selectedChip = useAtomValue(selectedChipAtom),
    configType = useAtomValue(configTypeAtom),
    list = useAtomValue(resolutionListAtom);

  const [resolution, setResolution] = useAtom(resolutionAtom)

  const fixed =
    selectedChip !== undefined
    && (resolution === defaultResolution)
    && (configType === ChipConfigType.RECOMMEND)

  const options = list.map(x => ({ key: x, value: x, label: x }))

  const disabled = configType !== ChipConfigType.CUSTOM

  const handleChange = (e: RadioChangeEvent) => {
    setResolution(e.target.value)
  }

  React.useEffect(
    () => {
      if (!selectedChipAtom) {
        setResolution(0)
        return
      }

      setResolution(defaultResolution)
    },
    [selectedChip, defaultResolution]
  )

  React.useEffect(
    () => {
      setResolution(defaultResolution)
    },
    [configType]
  )

  return {
    limit,
    resolution,
    options,
    disabled,
    handleChange,
    fixed,
  }
}

export const useParamsSetting = () => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [cardNum, setCardNum] = useAtom(cardNumAtom)
  const [configType, setConfigType] = useAtom(configTypeAtom)
  const [configFps, setConfigFps] = useAtom(configFpsAtom)
  const [configConcurrent, setConfigConcurrent] = useAtom(configConcurrentAtom)
  const [selectedChip] = useAtom(selectedChipAtom)
  console.log({ selectedChip })
  const [maxFPS] = useAtom(maxFPSAtom)
  const [maxChannel] = useAtom(maxChannelAtom)
  const showClip = useAtomValue(showClipAtom)
  const [clip, setClip] = useAtom(clipAtom)
  const resolution = useAtomValue(resolutionAtom)
  const totalFPS = selectedChip ? Math.floor((selectedChip.fps_limited / Math.pow(resolution / 640, 2))) : 0
  const disabledClip = !useAtomValue(supportClipAtom)

  const [tip, setTip] = React.useState<string>('')

  const cardLimit = useSelector(
    (state: RootState) => (state.globalSlice?.userInfo as any)?.quota?.task_gpu_limited || 1
  )


  const disableInput = configType !== ChipConfigType.CUSTOM
  const disableCustom = !selectedChip

  const fetchRecommendConfig = useFetchRecommendConfig()

  const handleCardNumChange = (cardNum: number | null) => {
    if ((cardNum || 1) > cardLimit)
      return message.warn(MAX_TIP.replace('{cardLimit}', cardLimit + ''))

    setTip((cardNum || 1) > 1 ? PENDING_TIP : '')

    setCardNum(cardNum || 1)
  }

  const handleTypeChange = (e: RadioChangeEvent) => {
    setConfigType(e.target.value)
  }

  const handleFpsChange = (fps: number | null) => {
    if (!fps) return setConfigFps(1)

    if (fps > maxFPS) return

    if (fps * configConcurrent > totalFPS) return

    setConfigFps(fps || 1)
  }

  const handleConcurrentChange = (concurrent: number | null) => {
    if (!concurrent) return setConfigConcurrent(1)

    if (concurrent > maxChannel) return

    if (concurrent * configFps > totalFPS) return

    setConfigConcurrent(concurrent || 1)
  }

  const handleClipChange: SwitchChangeEventHandler = (checked) => {
    setClip(checked)
  }

  React.useEffect(
    () => {
      timerRef.current && clearTimeout(timerRef.current)
      timerRef.current = null

      if (!tip) return

      timerRef.current = setTimeout(
        () => {
          setTip('')
        },
        5e3
      )
    },
    [tip]
  )

  React.useEffect(
    () => {
      if (!disabledClip && showClip) {
        setClip(true)
      }
    },
    [disabledClip, showClip]
  )

  React.useEffect(
    () => {
      if (configType !== ChipConfigType.RECOMMEND) return

      fetchRecommendConfig().catch(console.error)

      if (!disabledClip && showClip) {
        setClip(true)
      }
    },
    [configType]
  )

  React.useEffect(
    () => {
      if (totalFPS <= 0) return
      if (configFps * configConcurrent <= totalFPS) return

      let newFPS = Math.floor(totalFPS / configConcurrent)
      if (newFPS > maxFPS) newFPS = maxFPS

      let newConcurrent = Math.floor(totalFPS / newFPS)

      if (newConcurrent > maxChannel) {
        newConcurrent = maxChannel
      }

      setConfigFps(newFPS)
      setConfigConcurrent(newConcurrent)
    },
    [totalFPS]
  )

  React.useEffect(
    () => {
      if (disabledClip || !showClip)
        setClip(false)
    },
    [showClip, disabledClip]
  )

  return {
    tip,
    showTip: Boolean(tip),
    disableInput,
    disableCustom,
    cardNum,
    configType,
    configFps,
    configConcurrent,
    showClip,
    disabledClip,
    clip,
    handleClipChange,
    handleCardNumChange,
    handleTypeChange,
    handleFpsChange,
    handleConcurrentChange,
  }
}
