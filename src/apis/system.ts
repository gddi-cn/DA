import { APIResponse } from '@src/shared/types/api'
import { System } from '@src/shared/types/system'
import http from '@src/utils/http'

const systemAPI = {
  license: async (): Promise<APIResponse<{ license: System.License }>> => {
    try {
      const { data } = await http.get('/v3/system')
      return {
        success: true,
        data,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },
  updateDeviceLimit: async (idList: Array<string>, limit: number):
    Promise<APIResponse<void>> =>
  {
    try {
      await http.patch('/v3/devices', { devices: idList, max_process: limit})
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

export default systemAPI

