import { atom, useSetAtom } from 'jotai'
import React from 'react'

// 模型授权
export const authUsedAtom = atom<number>(0);
export const authTotalAtom = atom<number>(0);

// 模型训练个数
export const modelTrainUsedAtom = atom<number>(0);
export const modelTrainTotalAtom = atom<number>(0);

// 应用授权
export const channelUsedAtom = atom<number>(0);
export const channelTotalAtom = atom<number>(0)

// 训练时长
export const trainUsedAtom = atom<number>(0);
export const trainTotalAtom = atom<number>(0);

// 存储空间
export const storageUsedAtom = atom<number>(0);
export const storageTotalAtom = atom<number>(0);

// 应用设备
export const onlineDeviceUsedAtom = atom<number>(0);
export const onlineDeviceTotalAtom = atom<number>(0);

// SDK 设备
export const offlineDeviceUsedAtom = atom<number>(0);
export const offlineDeviceTotalAtom = atom<number>(0);

export const loadingAtom = atom<boolean>(false)

// 余额
export const balanceAtom = atom<number>(0)

export const useResetUsageStore = () => {
  const setAuthUsed = useSetAtom(authUsedAtom)
  const setAuthTotal = useSetAtom(authTotalAtom)
  const setChannelUsed = useSetAtom(channelUsedAtom)
  const setChannelTotal = useSetAtom(channelTotalAtom)
  const setTrainUsed = useSetAtom(trainUsedAtom)
  const setTrainTotal = useSetAtom(trainTotalAtom)
  const setStorageUsed = useSetAtom(storageUsedAtom)
  const setStorageTotal = useSetAtom(storageTotalAtom)
  const setLoading = useSetAtom(loadingAtom)
  const setModelTrainUsed = useSetAtom(modelTrainUsedAtom)
  const setModelTrainTotal = useSetAtom(modelTrainTotalAtom)
  const setOnlineDeviceUsed = useSetAtom(onlineDeviceUsedAtom)
  const setOnlineDeviceTotal = useSetAtom(onlineDeviceTotalAtom)
  const setOfflineDeviceUsed = useSetAtom(offlineDeviceUsedAtom)
  const setOfflineDeviceTotal = useSetAtom(offlineDeviceTotalAtom)
  const setBalance = useSetAtom(balanceAtom)

  React.useEffect(
    () => () => {
      setLoading(true)
      setAuthUsed(0)
      setAuthTotal(0)
      setChannelUsed(0)
      setChannelTotal(0)
      setTrainUsed(0)
      setTrainTotal(0)
      setStorageUsed(0)
      setStorageTotal(0)
      setModelTrainUsed(0)
      setModelTrainTotal(0)
      setOnlineDeviceUsed(0)
      setOnlineDeviceTotal(0)
      setOfflineDeviceUsed(0)
      setOfflineDeviceTotal(0)
      setBalance(0)
      setLoading(false)
    },
    []
  )
}

