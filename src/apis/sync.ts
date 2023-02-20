import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

const syncAPI = {
  list: async (params: Sync.ListParams): Promise<APIListResponse<Sync.Instance>> => {
    try {
      const { data } = await http.get('/v3/appsyncs', { params })
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

  sync: async (data: Sync.SyncParams): Promise<APIResponse<void>> => {
    try {
      await http.post('/v3/appsyncs', data)
      return {
        success: true,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  detail: async (id: Sync.Instance['id']): Promise<APIResponse<Sync.Instance>> => {
    try {
      const { data } = await http.get(`/v3/appsyncs/${id}`)
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

  retry: async (id: Sync.Instance['id']): Promise<APIResponse<void>> => {
    try {
      await http.put(`/v3/appsyncs/${id}`)
      return {
        success: true,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false,
      }
    }
  }
}

export default syncAPI
