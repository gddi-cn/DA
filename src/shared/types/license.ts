import { LicensedDevice } from '@src/shared/types/device'
import { LicenseStatus, LicenseType } from '@src/shared/enum/license'

// 授权
export interface License {
  // 许可 API 调用次数
  call_count: number;
  // 剩余调用次数
  call_remind: number;
  // 创建时间
  created: number;
  // 许可设备列表
  devices: Array<LicensedDevice>;
  // 授权有效期 (sdk 中是天数 云端是时间戳）
  expire: number,
  // 授权 ID
  id: string,
  // 授权类型
  license_type: LicenseType;
  // 授权设备数量
  quantity: number;
  // 授权状态
  status: LicenseStatus;
  // 更新时间
  updated: number;
}
