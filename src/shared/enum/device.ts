// 设备类型
export enum DeviceType {
  // 移动端
  MOBILE = 'Mobile',
  // 边缘端
  EDGE = 'Edge',
  // 终端
  TERMINAL = 'Terminal',
}

// 分组设备模型授权状态
export enum GroupDeviceModelAuthStatus {
  // 已授权
  AUTHORIZED = 'Authorized',
  // 未授权
  UNAUTHORIZED = 'Unauthorized',
  // 设备不匹配
  NOT_MATCH = 'NotMatch',
  // 已申请
  APPLIED = 'Applied',
}

//  分组设备状态
export enum GroupDeviceState {
  // 在线
  ONLINE = 'online',
  // 离线
  OFFLINE = 'offline',
  // 注销, 查看下发记录才可能出现
  DETELE = 'deleted'
}

// 设备 SDK 注册结果
export enum DeviceRegisterRes {
  // 成功
  SUCCESS = 'Success',
  // 设备重复
  REPEATED = 'Repeated',
  // 不支持该芯片类型的设备
  UNSUPPORTED = 'Unsupported',
}
