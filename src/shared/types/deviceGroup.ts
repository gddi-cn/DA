import { DeviceType } from '@src/shared/enum/device'
import { APIListParams } from '@src/shared/types/api'

// 设备组
export type DeviceGroup = {
  // 设备数量
  device_count: number;
  // ID
  id: string;
  // 名称
  name: string;
  // 设备类型
  type: DeviceType;
  // 更新时间
  update_time: number;
}

// 设备组选项
export type DeviceGroupOptions = {
  key: DeviceGroup['id'];
  value: DeviceGroup['id'];
  label: DeviceGroup['name'];
}

export interface DeviceGroupListParams extends APIListParams {
  name?: string,
  type?: DeviceType,
  app_id?: string,
  sort?: 'asc' | 'desc',
  sort_by_device_count?: string,
  sort_by_update_time?: boolean;
}