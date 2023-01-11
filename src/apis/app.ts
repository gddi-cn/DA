import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { GroupDevice } from '@src/shared/types/device'

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
    data: { device_ids: Array<GroupDevice['id']> }
  ): Promise<APIResponse<void>> => {
    try {
      await http.post(`/v3/apps/${appId}/syncs`, data)

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

export default appAPI
