import React from 'react'
import { useAtom } from 'jotai'
import { authUserInfoAtom } from '@src/store/user'
import { fetchingUsageAtom, usageAtom } from '../store'
import userAPI from '@src/apis/user'

const useGreeting = () => {
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const [greeting, setGreeting] = React.useState<string>('上午好!')

  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      setGreeting('上午好!')
    } else if (hour >= 12 && hour < 18) {
      setGreeting('下午好!')
    } else {
      setGreeting('晚上好!')
    }
  }

  React.useEffect(
    () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      getGreeting()

      timerRef.current = setInterval(getGreeting, 6e4)

      return () => {
        timerRef.current && clearInterval(timerRef.current)
      }
    },
    []
  )

  return greeting
}

export const useLeftContent = () => {
  const [userInfo] = useAtom(authUserInfoAtom)
  const greeting = useGreeting()

  return {
    greeting,
    username: userInfo?.username || '-'
  }
}

export const useRefreshUsage = () => {
  const [, setUsage] = useAtom(usageAtom)
  const [loading, setLoading] = useAtom(fetchingUsageAtom)

  return async () => {
    if (loading) return

    setLoading(true)
    const { success, data } = await userAPI.usage()
    setLoading(false)

    if (!success || !data) {
      setUsage(null)
      return
    }

    setUsage(data)
  }
}

export const useUsage = () => {
  const [loading] = useAtom(fetchingUsageAtom)

  const refresh = useRefreshUsage()

  React.useEffect(
    () => {
      refresh()
    },
    []
  )

  return {
    loading,
  }
}

export const useTrainTime = () => {
  const [usage] = useAtom(usageAtom)

  const { train_usage, train_limited } = usage || { train_limited: 1, train_usage: 0 }

  const noLimit = train_limited === 0

  const progress = noLimit ? 0 : ((train_usage / train_limited) * 10000 | 0) / 100

  const used = (train_usage / 6 | 0) / 10
  const total = noLimit ? '无限制' : (train_limited / 6 | 0) / 10

  const tip = `${used} / ${total} 小时`

  return {
    tip,
    progress
  }
}
