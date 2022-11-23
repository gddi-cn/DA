import { DeviceRegisterRes, DeviceType } from '@src/shared/enum/device'

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