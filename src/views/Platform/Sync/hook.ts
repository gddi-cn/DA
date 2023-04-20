import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { expireAtom, limitAtom, maxLimitAtom, syncTypeAtom } from '../store'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import systemAPI from '@src/apis/system'
import { selectedDeviceIdListAtom } from '../store'
import { message } from 'antd'

export const useMaxLimit = () => {
  const [rest, setMaxLimit] = useAtom(maxLimitAtom)
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  const length = selectedDeviceIdList.length

  const maxLimit = length === 0 ? rest : Math.floor(rest / length)

  const fetchMaxLimit = async () => {
    const { success, data } = await systemAPI.license()

    if (!success || !data?.license) return

    const { channel } = data.license

    setMaxLimit(channel)
  }

  React.useEffect(
    () => {
      fetchMaxLimit()
    },
    []
  )

  return {
    rest,
    maxLimit,
  }
}

export const useLimit = () => {
  const [limit, setLimit] = useAtom(limitAtom)
  // const rest = useAtomValue(maxLimitAtom)
  const selectedDeviceIdList = useAtomValue(selectedDeviceIdListAtom)
  // const length = selectedDeviceIdList.length

  // const maxLimit = length === 0 ? rest : Math.floor(rest / length)

  const handleChange  = (value: number | null) => {
    if (value === null) {
      setLimit(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    // if(value > maxLimit) {
    //   message.warn('总 Channel 超出限额')
    //   setLimit(maxLimit)
    //   return
    // }

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
