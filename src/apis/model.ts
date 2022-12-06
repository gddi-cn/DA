import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'
import { ApplyModel, License } from '@src/shared/types/license'
import { LicenseStatus, LicenseType } from '@src/shared/enum/license'
import { CreateModelData, CreateModelResponse } from '@src/shared/types/model'

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
  },

  modelAuth: async (id: string, version_id: string, model: ApplyModel): Promise<APIResponse<void>> => {
    try {
      await http.post(`/v3/models/${id}/versions/${version_id}/download/apply`, model)
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

  downloadLicense: async(id: License['id'], modelId: string, version_id: string): Promise<APIResponse<Blob>> => {
    try {
      const data = await http.get(
        `/v3/models/${modelId}/versions/${version_id}/license/${id}`,
        { responseType: 'blob' }
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

  downloadModel: async(modelId: string, version_id: string): Promise<APIResponse<Blob>> => {
    try {
      const res: { data: { url: string, size: number, hash: string }} = await http.get(
        `/v3/models/${modelId}/versions/${version_id}/download`,
      )

      if (!res.data?.url) return {
        success: false
      }

      const data = await http.get(res.data.url, {
        responseType: 'blob'
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
  },

  createModel: async (data: CreateModelData): Promise<APIResponse<CreateModelResponse>> => {
    try {
      const { data: resData } = await http.post('/v3/models', data)
      return {
        success: true,
        data: resData,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },
}

export default modelAPI
