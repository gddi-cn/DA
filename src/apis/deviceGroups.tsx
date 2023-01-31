import {
  DeviceGroup,
  DeviceGroupListParams,
  DeviceGroupOptions, GroupDeviceListParams
} from '@src/shared/types/deviceGroup'
import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { GroupDevice } from '@src/shared/types/device'
import { DeviceType } from '@src/shared/enum/device'

const getDeviceLabel = (group: DeviceGroup) => {
  const { name, online_device_count, device_count  } = group

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {name}
      </div>
      <div>{`${online_device_count || 0} / ${device_count || 0}`}</div>
    </div>
  )
}

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

  fetchEdgeDeviceGroupByName: async (name: string): Promise<Array<DeviceGroupOptions>> => {
    try {
      const { data, success } = await deviceGroupAPI.list({
        page: 1,
        page_size: 999,
        name,
        type: DeviceType.EDGE
      })
      return success && data?.items ? data.items.map(d => ({ key: d.id, value: d.id, label: getDeviceLabel(d) })) : []
    } catch (e) {
      console.error(e)
        return []
    }
  },
  
  fetchTerminalDeviceGroupByName: async (name: string): Promise<Array<DeviceGroupOptions>> => {
    try {
      const { data, success } = await deviceGroupAPI.list({
        page: 1,
        page_size: 999,
        name,
        type: DeviceType.TERMINAL
      })
      return success && data?.items ? data.items.map(d => ({ key: d.id, value: d.id, label: d.name })) : []
    } catch (e) {
      console.error(e)
        return []
    }
  },

  fetchDeviceGroupByName: async (name: string): Promise<Array<DeviceGroupOptions>> => {
    try {
      const { data, success } = await deviceGroupAPI.list({ page: 1, page_size: 999, name })
      return success && data?.items ? data.items.map(d => ({ key: d.id, value: d.id, label: getDeviceLabel(d) })) : []
    } catch (e) {
      console.error(e)
        return []
    }
  },

  // 按组获取设备列表
  // 默认组(id === 0)需要传设备类型
  fetchGroupDeviceList: async (groupId: number, params?: GroupDeviceListParams & { type?: DeviceType }):
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

  copyDevice: async (deviceId: number, groupId: number, targetGroupId: number): Promise<APIResponse<void>> => {
    try {
      await http.put(`/v3/devicegroups/${groupId}/devices/${deviceId}/copy`, { dest_id: targetGroupId })
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

  moveDevice: async (
    deviceId: number,
    groupId: number,
    targetGroupId: number
  ): Promise<APIResponse<void>> => {
    try {
      await http.put(`/v3/devicegroups/${groupId}/devices/${deviceId}/move`, { dest_id: targetGroupId })
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

  unregister: async (
    deviceId: number,
    groupId: number,
  ): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/devicegroups/${groupId}/devices/${deviceId}`)
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

  delete: async (groupId: number): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/devicegroups/${groupId}`)
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
