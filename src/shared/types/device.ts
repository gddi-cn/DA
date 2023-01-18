// 已注册设备
import { DeviceRegisterRes, GroupDeviceModelAuthStatus, GroupDeviceState } from '@src/shared/enum/device'

export interface LicensedDevice {
  // 设备名称
  name: string,
  // 设备 SN
  sn: string,
  // AI 芯片型号
  type: string,
  // 注册时间
  created: number,
}

// 分组下的设备
export interface GroupDevice {
  // 芯片型号
  chip: string,
  // 注册时间
  create_time: number,
  // 有效期
  expire: number,
  // ID
  id: number,
  // 匹配
  match: boolean;
  // 模型授权状态
  modelAuth: GroupDeviceModelAuthStatus,
  // 名称
  name: string,
  // SN
  sn: string,
  // 设备状态
  state: GroupDeviceState,
  // 设备型号
  type: string,
  // 更新时间
  update_time: number,
}

export interface DeviceRegisterResult {
  chip: string,
  filename: string,
  name: string,
  result: DeviceRegisterRes,
  sn: string,
}
