import React from 'react'
import { useAtom } from 'jotai'
import { expireAtom, limitAtom, maxLimitAtom, syncTypeAtom } from '../store'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import systemAPI from '@src/apis/system'
import userAPI from '@src/apis/user'

export const useMaxLimit = () => {
  const [maxLimit, setMaxLimit] = useAtom(maxLimitAtom)

  const fetchMaxLimit = async () => {
    const { success, data } = await userAPI.usage()

    if (!success || !data) return

    const { channel_limited, channel_usage } = data || { channel_limited: 0, channel_usage: 0 }
    const rest = channel_limited - channel_usage

    setMaxLimit(rest > 0 ? rest : 0)
  }

  React.useEffect(
    () => {
      fetchMaxLimit()
    },
    []
  )

  return {
    maxLimit,
  }
}

export const useLimit = () => {
  const [limit, setLimit] = useAtom(limitAtom)

  const handleChange  = (value: number | null) => {
    if (value === null) {
      setLimit(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }
    setLimit(value)
  }


  return {
    limit,
    handleChange,
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
