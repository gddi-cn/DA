import { DeviceType, GroupDeviceState } from '@src/shared/enum/device'
import { APIListParams } from '@src/shared/types/api'

// 设备组
export type DeviceGroup = {
  // 设备数量
  device_count: number;
  // ID
  id: number;
  // 名称
  name: string;
  online_device_count: number;
  // 设备类型
  type: DeviceType;
  // 更新时间
  update_time: number;
}

// 设备组选项
export type DeviceGroupOptions = {
  key: DeviceGroup['id'];
  value: DeviceGroup['id'];
  label: React.ReactNode;
}

export interface DeviceGroupListParams extends APIListParams {
  name?: string,
  type?: DeviceType,
  app_id?: string,
  sort?: 'asc' | 'desc',
  sort_by_device_count?: string,
  sort_by_update_time?: boolean;
}

// 组设备列表参数
export interface GroupDeviceListParams extends APIListParams {
  // 名称
  name?: string,
  // 下发 ID
  sync_id?: string,
  // 模型迭代 ID
  model_iter_id?: string,
  // 应用 ID
  app_id?: string,
  // 设备状态
  status?: GroupDeviceState,
  // 排序方式
  sort?: 'asc' | 'desc',
  sort_by?: 'name' | 'registered_time'
  // // 按芯片排序
  // sort_by_expire?: 'asc' | 'desc',
  // // 按芯片排序
  // sort_by_chip?: 'asc' | 'desc',
  // // 按设备名称排序
  // sort_by_name?: 'asc' | 'desc',
}
