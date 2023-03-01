import { useAtom } from 'jotai'
import { RadioChangeEvent } from 'antd/lib/radio/interface'

import {
  noLimitAtom,
  limitAtom,
  noExpireAtom,
  expireAtom,
} from '../../store'
import React from 'react'

export const useConfig = () => {
  const [limit, setLimit] = useAtom(limitAtom)
  const [expire, setExpire] = useAtom(expireAtom)
  const [noLimit, setNoLimit] = useAtom(noLimitAtom)
  const [noExpire, setNoExpire] = useAtom(noExpireAtom)

  const handleLimitChange  = (value: number | null) => {
    if (value === null) {
      setLimit(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
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


  const handleLimitRadioChange = (e: RadioChangeEvent) => setNoLimit(e.target.value)
  const handleExpireRadioChange = (e: RadioChangeEvent) => setNoExpire(e.target.value)

  React.useEffect(
    () => {
      if (noLimit) {
        setLimit(-1)
      } else {
        setLimit(limit > 0 ? limit : 1)
      }
    },
    [noLimit]
  )

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
    noLimit,
    expire,
    noExpire,
    handleLimitRadioChange,
    handleLimitChange,
    handleExpireRadioChange,
    handleExpireChange,
  }
}
