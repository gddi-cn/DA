import { DeviceType } from '@src/shared/enum/device'

export const deviceTypeNameMapping: Map<DeviceType, string> = new Map([
  [DeviceType.MOBILE, /*   */'移动端'],
  [DeviceType.EDGE, /*     */'边缘端'],
  [DeviceType.TERMINAL, /* */'终端'],
])