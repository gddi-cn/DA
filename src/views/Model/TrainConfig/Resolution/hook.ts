import { ChipConfigType } from '@src/shared/enum/chip'
import { RadioChangeEvent } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import {
  configTypeAtom, defaultResolutionAtom, resolutionAtom, resolutionLimitAtom, resolutionListAtom, selectedChipAtom
} from '../store'

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
