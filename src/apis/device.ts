import { DeviceGroup } from '@src/shared/types/deviceGroup'
import { APIResponse } from '@src/shared/types/api'
import { DeviceRegisterResult } from '@src/shared/types/device'
import http from '@src/utils/http'

const deviceAPI = {
  offlineRegister: async (
    groupId: DeviceGroup['id'],
    formData: FormData,
  ): Promise<APIResponse<Array<DeviceRegisterResult>>> => {
    try {
      const { data } = await http.post(
        '/v3/device/offline_register',
        formData,
        { params: { group: groupId  }}
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
}

export default deviceAPI
