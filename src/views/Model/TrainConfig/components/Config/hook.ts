import React from 'react'
import { useAtom, useAtomValue } from 'jotai'

import {
  cardNumAtom, configConcurrentAtom, configFpsAtom, configTypeAtom, maxChannelAtom, maxFPSAtom, resolutionAtom, selectedChipAtom
} from '../../store'
import { message, RadioChangeEvent } from 'antd'
import { ChipConfigType } from '@src/shared/enum/chip'
import { RootState } from '@reducer'
import { useSelector } from 'react-redux'

const MAX_TIP = '您当前的训练配额卡数是 {cardLimit} 个，想升级服务请联系客服。'
const PENDING_TIP = '当前选择卡数较大，可能需要较长时间等待训练'

export const useParamsSetting = () => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [cardNum, setCardNum] = useAtom(cardNumAtom)
  const [configType, setConfigType] = useAtom(configTypeAtom)
  const [configFps, setConfigFps] = useAtom(configFpsAtom)
  const [configConcurrent, setConfigConcurrent] = useAtom(configConcurrentAtom)
  const [selectedChip] = useAtom(selectedChipAtom)
  const [maxFPS] = useAtom(maxFPSAtom)
  const [maxChannel] = useAtom(maxChannelAtom)
  const resolution = useAtomValue(resolutionAtom)
  const totalFPS = selectedChip ? Math.floor((selectedChip.fps_limited / Math.pow(resolution / 640, 2))) : 0

  const [tip, setTip] = React.useState<string>('')

  const cardLimit = useSelector(
    (state: RootState) => (state.globalSlice?.userInfo as any)?.quota?.task_gpu_limited || 1
  )


  const disableInput = configType !== ChipConfigType.CUSTOM
  const disableCustom = !selectedChip

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
      if (totalFPS <= 0) return
      if (configFps * configConcurrent <= totalFPS) return

      let newFPS = Math.floor(totalFPS / configConcurrent)
      if (newFPS > maxFPS) newFPS = maxFPS
      const newConcurrent = Math.floor(totalFPS / newFPS)

      setConfigFps(newFPS)
      setConfigConcurrent(newConcurrent)
    },
    [totalFPS]
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
    handleCardNumChange,
    handleTypeChange,
    handleFpsChange,
    handleConcurrentChange,
  }
}
