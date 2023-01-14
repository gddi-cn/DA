import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { GroupDevice } from '@src/shared/types/device'
import { downloadBlob } from '@src/utils/tools'

const appAPI = {
  list: async (params: App.ListParams): Promise<APIListResponse<App.Instance>> => {
    try {
      const { data } = await http.get('/v3/apps', { params })
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

  templateList: async (params: App.Template.ListParams): Promise<APIListResponse<App.Template.Instance>> => {
    try {
      const { data } = await http.get('/v3/apptemplates', { params })
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

  create: async (data: App.CreateData): Promise<APIResponse<App.Instance>> => {
    try {
      const { data: _data } = await http.post('/v3/apps', data)
      return {
        success: true,
        data: _data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  sync: async (
    appId: App.Instance['id'],
    data: { device_ids: Array<GroupDevice['id']>, expire_seconds: number, limit: number }
  ): Promise<APIResponse<void>> => {
    try {
      await http.post(`/v3/apps/${appId}/syncs2`, data)

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

  export: async (
    appId: App.Instance['id'],
    data: { device_ids: Array<GroupDevice['id']>, expire_seconds: number, limit: number },
    filename: string
  ): Promise<APIResponse<void>> => {
    try {
      const blob = await http.put(`/v3/apps/${appId}/export`, data, { responseType: 'blob' })

      downloadBlob(blob, filename)

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

  delete: async (
    appId: App.Instance['id']
  ): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/apps/${appId}`)
      return {
        success: true,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false
      }
    }
  },
}

export default appAPI
