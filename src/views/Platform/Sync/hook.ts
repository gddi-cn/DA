import React from 'react'
import { useAtom } from 'jotai'
import { expireAtom, limitAtom, syncTypeAtom } from '../store'
import { RadioChangeEvent } from 'antd/lib/radio/interface'

export const useLimit = () => {
  const [, setLimit] = useAtom(limitAtom)

  const [noLimit, setNoLimit] = React.useState<boolean>(true)
  const [disableLimitInput, setDisableLimitInput] = React.useState<boolean>(true)
  const [limitInputValue, setLimitInputValue] = React.useState<number | null>(null)

  const handleDisableLimitInputChange  = (value: number | null) => {
    if (value === null) {
      setLimitInputValue(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    setLimitInputValue(value)
  }


  const handleLimitRadioChange = (e: RadioChangeEvent) => setNoLimit(e.target.value)

  React.useEffect(
    () => {
      setDisableLimitInput(noLimit)
    },
    [noLimit]
  )

  React.useEffect(
    () => {
      if (!disableLimitInput) {
        setLimitInputValue(1)
      } else {
        setLimitInputValue(null)
      }
    },
    [disableLimitInput]
  )

  React.useEffect(
    () => {
      if (noLimit) {
        setLimit(-1)
        return
      }

      setLimit(limitInputValue || 1)
    },
    [noLimit, limitInputValue]
  )

  return {
    noLimit,
    limitInputValue,
    disableLimitInput,
    handleLimitRadioChange,
    handleDisableLimitInputChange,
  }
}

export const useExpire = () => {
  const [, setExpire] = useAtom(expireAtom)

  const [noExpire, setNoExpire] = React.useState<boolean>(true)
  const [disableExpireInput, setDisableExpireInput] = React.useState(true)
  const [expireInputValue, setExpireInputValue] = React.useState<number | null>(null)

  const handleDisableExpireInputChange = (value: number | null) => {
    if (value === null) {
      setExpireInputValue(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    setExpireInputValue(value)
  }

  const handleExpireRadioChange = (e: RadioChangeEvent) => setNoExpire(e.target.value)

  React.useEffect(
    () => {
      setDisableExpireInput(noExpire)
    },
    [noExpire]
  )

  React.useEffect(
    () => {
      if (!disableExpireInput) {
        setExpireInputValue(1)
      } else {
        setExpireInputValue(null)
      }
    },
    [disableExpireInput]
  )

  React.useEffect(
    () => {
      if (noExpire) {
        setExpire(-1)
        return
      }

      setExpire((expireInputValue || 1) * 8.64e4)
    },
    [noExpire, expireInputValue]
  )

  return {
    noExpire,
    expireInputValue,
    disableExpireInput,
    handleExpireRadioChange,
    handleDisableExpireInputChange,
  }
}

export const useSyncType = () => {
  const [syncType, setSyncType] = useAtom(syncTypeAtom)

  const handleChange = (e: RadioChangeEvent) => setSyncType(e.target.value)

  return {
    syncType,
    handleChange,
  }
}
