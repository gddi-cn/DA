import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

const apiKeyAPI = {
  list: async (params: APIKey.List.Params, signal?: AbortSignal): APIKey.List.Response => {
    try {
      const { data } = await http.get('/v1/open/certificates', { params, signal })

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

  create: async (data: APIKey.Create.Data, signal?: AbortSignal): APIKey.Create.Response => {
    try {
      await http.post('/v1/open/certificates', data, { signal })

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

  delete: async (id: APIKey.Instance['id'], signal?: AbortSignal): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v1/open/certificates/${id}`, { signal })
      return {
        success: true,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  }
}

export default apiKeyAPI

