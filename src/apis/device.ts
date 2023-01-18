import { DeviceGroup } from '@src/shared/types/deviceGroup'
import { APIListResponse, APIResponse } from '@src/shared/types/api'
import { DeviceRegisterResult } from '@src/shared/types/device'
import http from '@src/utils/http'
import { DeviceType } from '@src/shared/enum/device'

const deviceAPI = {
  offlineRegister: async (
    groupId: DeviceGroup['id'],
    formData: FormData,
    device_type?: DeviceType,
  ): Promise<APIResponse<Array<DeviceRegisterResult>>> => {
    try {
      const { data } = await http.post(
        '/v3/device/offline_register',
        formData,
        { params: { group: groupId, device_type  }}
      )
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

  chipTypeList: async (params: Device.Chip.ListParams): Promise<APIListResponse<Device.Chip.Instance>> => {
    try {
      const { data } = await http.get('/v3/device/types', { params })
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

  genAuthCode: async (groupId: number): Promise<APIResponse<string>> => {
    try {
      const { data } = await http.get('/v3/device/auth_code', { params: { group: groupId } })
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
  }
}

export default deviceAPI
