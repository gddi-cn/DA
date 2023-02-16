import { DeviceRegisterRes, DeviceType, GroupDeviceState } from '@src/shared/enum/device'
import React from 'react'

export const deviceTypeNameMapping: Map<DeviceType, string> = new Map([
  [DeviceType.MOBILE, /*   */'移动端'],
  [DeviceType.EDGE, /*     */'边缘端'],
  [DeviceType.TERMINAL, /* */'终端'],
])

export const deviceRegisterResultNameMapping: Map<DeviceRegisterRes, string> = new Map([
  [DeviceRegisterRes.SUCCESS, /*     */'注册成功'],
  [DeviceRegisterRes.REPEATED, /*    */'设备重复'],
  [DeviceRegisterRes.UNSUPPORTED, /* */'不支持该芯片类型的设备'],
])

export const groupDeviceStateNameMapping: Map<GroupDeviceState, string> = new Map([
  [GroupDeviceState.OFFLINE, /* */'离线'],
  [GroupDeviceState.ONLINE, /* */'在线'],
  [GroupDeviceState.DETELE, /* */'已注销'],
])

export const groupDeviceStateColorMapping: Map<GroupDeviceState, React.CSSProperties['color']> = new Map([
  [GroupDeviceState.OFFLINE, /* */'#FF6177'],
  [GroupDeviceState.ONLINE, /* */'#19A051'],
  [GroupDeviceState.DETELE, /* */'#FF6177'],
])
