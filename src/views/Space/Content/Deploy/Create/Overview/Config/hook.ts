import { useAtom, useAtomValue } from 'jotai'
import { RadioChangeEvent } from 'antd/lib/radio/interface'

import {
  limitAtom,
  noExpireAtom,
  expireAtom,
  templateInputAtom,
} from '../../store'
import React from 'react'
import { AppTemplateInput } from '@src/shared/enum/application'

export const useConfig = () => {
  const [limit, setLimit] = useAtom(limitAtom)
  const [expire, setExpire] = useAtom(expireAtom)
  const [noExpire, setNoExpire] = useAtom(noExpireAtom)
  const inputType = useAtomValue(templateInputAtom)

  const hideLimit = inputType === AppTemplateInput.IMAGE

  const handleLimitChange = (value: number | null) => {
    if (hideLimit) return

    if (value === null) {
      setLimit(1)
      return
    }

    if (!/^[1-9]\d*$/.test(value + '')) {
      return
    }

    setLimit(value)
  }

  const handleExpireChange = (value: number | null) => {
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
    hideLimit,
    expire,
    noExpire,
    handleLimitChange,
    handleExpireRadioChange,
    handleExpireChange,
  }
}
