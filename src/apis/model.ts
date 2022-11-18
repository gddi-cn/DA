import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'
import { License } from '@src/shared/types/license'
import { LicenseStatus, LicenseType } from '@src/shared/enum/license'

const modelAPI = {
  fetchLicenseList: async (
    id: string,
    version_id: string,
    status?: LicenseStatus,
    type?: LicenseType
  ): Promise<APIResponse<Array<License>>> => {
    try {
      const { data } = await http.get(`/v3/models/${id}/versions/${version_id}/license`, {
        params: {
          status,
          type,
        }
      })

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

export default modelAPI
