import { DeviceGroup, DeviceGroupListParams, DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { APIListResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

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
}

export default deviceGroupAPI
