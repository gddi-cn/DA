import React from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { authUserInfoAtom } from '@src/store/user'
import { currentPageAtom } from '../store'
import { Space } from '../enums'
import {
  authUsedAtom,
  authTotalAtom,
  channelUsedAtom,
  channelTotalAtom,
  trainUsedAtom,
  trainTotalAtom,
  storageUsedAtom,
  storageTotalAtom,
  loadingAtom,
  useResetUsageStore,
  modelTrainUsedAtom,
  modelTrainTotalAtom,
  onlineDeviceUsedAtom,
  onlineDeviceTotalAtom,
  offlineDeviceUsedAtom,
  offlineDeviceTotalAtom,
  balanceAtom,
  authTypeAtom,
  expireAtom,
} from './store'
import userAPI from '@src/apis/user'
import { formatUnixTime } from '@src/utils/tools'

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

  React.useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    getGreeting()

    timerRef.current = setInterval(getGreeting, 6e4)

    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [])

  return greeting
}

export const useLeftContent = () => {
  const [userInfo] = useAtom(authUserInfoAtom)
  const greeting = useGreeting()

  return {
    greeting, username: userInfo?.nick_name || '-'
  }
}

export const useRefreshUsage = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  const setAuthType = useSetAtom(authTypeAtom)
  const setAuthUsed = useSetAtom(authUsedAtom)
  const setAuthTotal = useSetAtom(authTotalAtom)
  const setChannelUsed = useSetAtom(channelUsedAtom)
  const setChannelTotal = useSetAtom(channelTotalAtom)
  const setTrainUsed = useSetAtom(trainUsedAtom)
  const setTrainTotal = useSetAtom(trainTotalAtom)
  const setStorageUsed = useSetAtom(storageUsedAtom)
  const setStorageTotal = useSetAtom(storageTotalAtom)
  const setModelTrainUsed = useSetAtom(modelTrainUsedAtom)
  const setModelTrainTotal = useSetAtom(modelTrainTotalAtom)
  const setOnlineDeviceUsed = useSetAtom(onlineDeviceUsedAtom)
  const setOnlineDeviceTotal = useSetAtom(onlineDeviceTotalAtom)
  const setOfflineDeviceUsed = useSetAtom(offlineDeviceUsedAtom)
  const setOfflineDeviceTotal = useSetAtom(offlineDeviceTotalAtom)
  const setBalance = useSetAtom(balanceAtom)
  const setExpire = useSetAtom(expireAtom)

  return async () => {
    if (loading) return

    setLoading(true)
    const { success, data } = await userAPI.usage()
    setLoading(false)

    if (!success || !data) return

    const {
      authorization_type,
      authorization_usage,
      authorization_limited,
      channel_usage,
      channel_limited,
      expire,
      train_usage,
      train_limited,
      storage_usage,
      storage_limited,
      model_usage,
      model_limited,
      online_device_usage,
      online_device_limited,
      offline_device_usage,
      offline_device_limited,
      balance,
    } = data

    setAuthType(authorization_type)
    setAuthUsed(authorization_usage)
    setAuthTotal(authorization_limited)
    setChannelUsed(channel_usage)
    setChannelTotal(channel_limited)
    setTrainUsed(train_usage)
    setTrainTotal(train_limited)
    setStorageUsed(storage_usage)
    setStorageTotal(storage_limited)
    setModelTrainUsed(model_usage)
    setModelTrainTotal(model_limited)
    setOnlineDeviceUsed(online_device_usage)
    setOnlineDeviceTotal(online_device_limited)
    setOfflineDeviceUsed(offline_device_usage)
    setOfflineDeviceTotal(offline_device_limited)
    setBalance(balance)
    setExpire(expire)
  }
}

export const useUsage = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const authType = useAtomValue(authTypeAtom)
  const isOEM = authType === 'OEM'

  const loading = useAtomValue(loadingAtom)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  useResetUsageStore()
  const refresh = useRefreshUsage()

  const handleClick = () => {
    setCurrentPage(Space.Page.USAGE)
  }

  React.useEffect(() => {
    refresh()
  }, [])

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (currentPage === Space.Page.USAGE) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    isOEM,
    containerRef,
    loading,
    handleClick,
  }
}

export const useAccount = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const active = currentPage === Space.Page.ACCOUNT

  const handleClick = () => {
    setCurrentPage(Space.Page.ACCOUNT)
  }

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (active) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    active,
    handleClick,
    containerRef
  }
}

export const useDevice = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const active = currentPage === Space.Page.DEVICE

  const handleClick = () => {
    setCurrentPage(Space.Page.DEVICE)
  }

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (active) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    active, handleClick, containerRef
  }
}

export const useApi = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const active = currentPage === Space.Page.API

  const handleClick = () => {
    setCurrentPage(Space.Page.API)
  }

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (active) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    active, handleClick, containerRef
  }
}

export const useApp = () => {

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const active = currentPage === Space.Page.APP

  const handleClick = () => {
    setCurrentPage(Space.Page.APP)
  }

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (active) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    active, handleClick, containerRef
  }
}

export const useDeploy = () => {

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const active = currentPage === Space.Page.DEPLOY

  const handleClick = () => {
    setCurrentPage(Space.Page.DEPLOY)
  }

  React.useEffect(() => {
    const $c = containerRef.current
    if (!$c) return

    if (active) {
      $c.setAttribute('selected', '')
    } else {
      $c.removeAttribute('selected')
    }
  }, [currentPage])

  return {
    active, handleClick, containerRef
  }
}

export const useChannel = () => {
  const channel = useAtomValue(channelUsedAtom)
  const channelTotal = useAtomValue(channelTotalAtom)
  const noLimit = channelTotal === 0

  const progress = noLimit ? 0 : (channel / channelTotal) * 100 | 0
  const tip = `${channel} / ${noLimit ? '无限制' : channelTotal} 路`

  return {
    progress, tip
  }
}

export const useModel = () => {
  const model = useAtomValue(authUsedAtom)
  const modelTotal = useAtomValue(authTotalAtom)
  const noLimit = modelTotal === 0

  const progress = noLimit ? 0 : (model / modelTotal) * 100 | 0
  const tip = `${model} / ${noLimit ? '无限制' : modelTotal} 个`

  return {
    progress, tip
  }
}

export const useTrain = () => {
  const train = useAtomValue(trainUsedAtom)
  const trainTotal = useAtomValue(trainTotalAtom)
  const noLimit = trainTotal === 0

  const trainHour = (train / 6 | 0) / 10
  const trainTotalHour = (trainTotal / 6 | 0) / 10

  const progress = noLimit ? 0 : (train / trainTotal) * 100 | 0
  const tip = `${trainHour} / ${noLimit ? '无限制' : trainTotalHour} 小时`

  return {
    progress, tip
  }
}

export const useStorage = () => {
  const storage = useAtomValue(storageUsedAtom)
  const storageTotal = useAtomValue(storageTotalAtom)
  const noLimit = storageTotal === 0

  // Byte to GB and round to 1 decimal
  const storageGB = (storage / 1024 / 1024 / 102.4 | 0) / 10
  const storageTotalGB = (storageTotal / 1024 / 102.4 | 0) / 10

  const progress = noLimit ? 0 : (storage / storageTotal) * 100 | 0
  const tip = `${storageGB} / ${noLimit ? '无限制' : storageTotalGB} GB`

  return {
    progress, tip
  }
}

// 应用设备
export const useEdgeDevice = () => {
  const device = useAtomValue(onlineDeviceUsedAtom)
  const deviceTotal = useAtomValue(onlineDeviceTotalAtom)
  const noLimit = deviceTotal === 0

  const progress = noLimit ? 0 : (device / deviceTotal) * 100 | 0
  const tip = `${device} / ${noLimit ? '无限制' : deviceTotal} 台`

  return {
    progress, tip
  }
}

// SDK 设备
export const useTerminalDevice = () => {
  const device = useAtomValue(offlineDeviceUsedAtom)
  const deviceTotal = useAtomValue(offlineDeviceTotalAtom)
  const noLimit = deviceTotal === 0

  const progress = noLimit ? 0 : (device / deviceTotal) * 100 | 0
  const tip = `${device} / ${noLimit ? '无限制' : deviceTotal} 台`

  return {
    progress, tip
  }
}

// 模型训练
export const useModelTrain = () => {
  const model = useAtomValue(modelTrainUsedAtom)
  const modelTotal = useAtomValue(modelTrainTotalAtom)
  const noLimit = modelTotal === 0

  const progress = noLimit ? 0 : (model / modelTotal) * 100 | 0
  const tip = `${model} / ${noLimit ? '无限制' : modelTotal} 个`

  return {
    progress, tip
  }
}

export const useBalance = () => {
  const _balance = useAtomValue(balanceAtom)

  const balance = _balance + ' 元'

  return {
    balance
  }
}

export const useExpire = () => {
  const expire = useAtomValue(expireAtom)

  const expireString = expire ? formatUnixTime(expire) : '--'

  return {
    expire: expireString,
  }
}
