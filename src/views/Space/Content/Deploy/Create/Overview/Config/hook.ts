import { useAtom, useAtomValue } from 'jotai'
import { RadioChangeEvent } from 'antd/lib/radio/interface'

import {
  limitAtom,
  noExpireAtom,
  expireAtom,
  selectedDeviceListAtom,
} from '../../store'
import React from 'react'
import { channelRestAtom } from '@src/views/Space/LeftContent/store'
import { message } from 'antd'

export const useConfig = () => {
  const rest = useAtomValue(channelRestAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [expire, setExpire] = useAtom(expireAtom)
  const [noExpire, setNoExpire] = useAtom(noExpireAtom)
  const selectedDevices = useAtomValue(selectedDeviceListAtom)
  const length = selectedDevices.length

  const maxLimit = length === 0 ? rest : Math.floor(rest / length)

  const handleLimitChange  = (value: number | null) => {
    if (value === null) {
      setLimit(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    if (value > maxLimit) {
      message.warn('总 Channel 超出限额')
      setLimit(maxLimit)
      return
    }

    setLimit(value)
  }

  const handleExpireChange  = (value: number | null) => {
    if (value === null) {
      setExpire(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    setExpire(value)
  }


  const handleExpireRadioChange = (e: RadioChangeEvent) => setNoExpire(e.target.value)

  React.useEffect(
    () => {
      if (noExpire) {
        setExpire(-1)
      } else {
        setExpire(expire > 0 ? expire : 1)
      }
    }
  )

  return {
    limit,
    expire,
    noExpire,
    handleLimitChange,
    handleExpireRadioChange,
    handleExpireChange,
    rest,
  }
}
