import {
  DeviceGroup,
  DeviceGroupListParams,
  DeviceGroupOptions, GroupDeviceListParams
} from '@src/shared/types/deviceGroup'
import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { GroupDevice } from '@src/shared/types/device'
import { DeviceType } from '@src/shared/enum/device'

const deviceGroupAPI = {
  list: async (params: DeviceGroupListParams): Promise<APIListResponse<DeviceGroup>> => {
    try {
      const { data } = await http.get('/v3/devicegroups', { params })
      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  fetchDeviceGroupByName: async (name: string): Promise<Array<DeviceGroupOptions>> => {
    try {
      const { data, success } = await deviceGroupAPI.list({ page: 1, page_size: 10, name })
      return success && data?.items ? data.items.map(d => ({ key: d.id, value: d.id, label: d.name })) : []
    } catch (e) {
      console.error(e)
        return []
    }
  },

  // 按组获取设备列表
  // 默认组(id === 0)需要传设备类型
  fetchGroupDeviceList: async (groupId: number, params?: GroupDeviceListParams & { type?: DeviceType}):
    Promise<APIListResponse<GroupDevice>> => {
    try {
      const { data } = await http.get(`/v3/devicegroups/${groupId}/devices`, { params })
      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  create: async (name: string, type: DeviceType): Promise<APIResponse<void>> => {
    try {
      await http.post('/v3/devicegroups', { name, type })
      return {
        success: true,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },
}

export default deviceGroupAPI
