// 已注册设备
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

