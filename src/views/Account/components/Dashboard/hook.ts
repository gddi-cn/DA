import { userUsageAtom } from "@src/store/user"
import { useAtomValue } from "jotai"

export const useChatList = () => {
  const usage = useAtomValue(userUsageAtom)
  const {
    train_usage,
    train_limited,
    storage_usage,
    storage_limited,
  } = usage || {
    train_usage: 0,
    train_limited: 0,
    storage_usage: 0,
    storage_limited: 0,
  }

  return {
    trainUsed: (train_usage / 60 * 10 | 0) / 10,
    trainLimited: train_limited / 60 | 0,
    storageUsed: (storage_usage / 1024 / 1024 / 1024 * 10 | 0) / 10,
    storageLimited: (storage_limited / 1024 / 1024 / 1024) | 0,
  }
}

export const useProgressList = () => {
  const usage = useAtomValue(userUsageAtom)
  const {
    authorization_usage,
    authorization_limited,
    online_device_usage,
    online_device_limited,
    model_usage,
    model_limited,
    offline_device_usage,
    offline_device_limited,
    channel_usage,
    channel_limited,
  } = usage || {
    authorization_usage: 0,
    authorization_limited: 0,
    online_device_usage: 0,
    online_device_limited: 0,
    model_usage: 0,
    model_limited: 0,
    offline_device_usage: 0,
    offline_device_limited: 0,
    channel_usage: 0,
    channel_limited: 0,
  }

  return {
    modelAuthUsed: authorization_usage,
    modelAuthLimited: authorization_limited,
    appDeviceUsed: online_device_usage,
    appDeviceLimited: online_device_limited,
    modelTrainUsed: model_usage,
    modelTrainLimited: model_limited,
    SDKDeviceUsed: offline_device_usage,
    SDKDeviceLimited: offline_device_limited,
    appAuthUsed: channel_usage,
    appAuthLimited: channel_limited,
  }
}
