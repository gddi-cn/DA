import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

const apiAPI = {
  list: async (params: API.SearchParams): Promise<APIListResponse<API.Instance>> => {
    try {
      const { data } = await http.get('/v1/open/certificates', { params })
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

  create: async (data: API.CreateData): Promise<APIResponse<void>> => {
    try {
      await http.post('/v1/open/certificates', data)
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

  delete: async (id: API.Instance['id']): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v1/open/certificates/${id}`)
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

export default apiAPI

