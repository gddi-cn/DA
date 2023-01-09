import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

export const experienceAPI = {
  create: async (model_iter_id: string): Promise<APIResponse<Experience.Instance>> => {
    try {
      const { data } = await http.post('/v3/trialapps', { model_iter_id })
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

  detail: async (id: string): Promise<APIResponse<Experience.Instance>> => {
    try {
      const { data } = await http.get(`/v3/trialapps/${id}`)
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

  delete: async (id: string): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/trialapps/${id}`)
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

  check: async (id: string): Promise<APIResponse<{ supported: boolean }>> => {
    try {
      const { data } = await http.get(`/v3/trialapps/${id}/check`)
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

export default experienceAPI
