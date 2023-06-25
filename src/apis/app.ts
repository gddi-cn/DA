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

  createTemplate: async (data: App.Template.CreateData): Promise<APIResponse<void>> => {
    try {
      await http.post('/v3/apptemplates', data)
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

  deleteTemplate: async (id: App.Template.Instance['id']): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/apptemplates/${id}`)
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

  templateLabelList: async ():
    Promise<APIResponse<Array<string>>> => {
    try {
      const { data } = await http.get('/v3/apptemplate/labels')

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
    data: { device_ids: Array<GroupDevice['id']>, expire_seconds: number, limit?: number }
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
    data: { device_ids: Array<GroupDevice['id']>, expire_seconds: number, limit?: number },
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

  export2: async (
    appId: App.Instance['id'],
    data: { device_ids: Array<GroupDevice['id']>, expire_seconds: number, limit?: number },
  ): Promise<APIResponse<{ urls: Array<string> }>> => {
    try {
      const { data: _data } = await http.post(`/v3/apps/${appId}/export2`, data)

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

  detail: async (id: App.Instance['id']): Promise<APIResponse<App.Instance>> => {
    try {
      const { data } = await http.get(`/v3/apps/${id}`)

      return {
        success: true,
        data,
      }
    } catch (e) {
      console.error(e)

      return {
        success: false
      }
    }
  },

  syncList: async (id: App.Instance['id']): Promise<APIListResponse<Sync.Instance>> => {
    try {
      const { data } = await http.get(`/v3/apps/${id}/syncs`)
      return {
        success: true,
        data,
      }
    } catch (e) {
      return {
        success: false
      }
    }
  },

  syncDetail: async (appId: App.Instance['id'], syncId: Sync.Instance['id']) => {
    try {
      const { data } = await http.get(`/v3/apps/${appId}/syncs/${syncId}`)
      return {
        success: true,
        data,
      }
    } catch (e) {
      return {
        success: false
      }
    }
  },

  update: async (
    id: App.Instance['id'],
    data: Partial<Pick<App.Instance, 'name' | 'cover' | 'description'>>
  ): Promise<APIResponse<void>> => {
    try {
      await http.put(`/v3/apps/${id}`, data)
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

  copy: async (id: App.Instance['id']): Promise<APIResponse<App.Instance>> => {
    try {
      const { data } = await http.put(`/v3/apps/${id}/copy`)
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

export default appAPI
