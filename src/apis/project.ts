import {APIListResponse, APIResponse} from '@src/shared/types/api'
import http from '@src/utils/http'
import { UpdateProjectData, UpdateProjectResponse } from '@src/shared/types/project'

const projectAPI = {
  detail: async(id: Project.Detail['id']): Promise<APIResponse<Project.Detail>> => {
    try {
      const { data } = await http.get(`/v3/projects/${id}`)
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

  list: async (params: Project.ListParams): Promise<APIListResponse<Project.Detail>> => {
    try {
      const { data } = await http.get('/v3/projects', { params })
      return {
        data,
        success: true
      }
    } catch (e) {
      console.log(e)
      return {
        success: false
      }
    }
  },

  update: async (id: string, data: UpdateProjectData): Promise<APIResponse<UpdateProjectResponse>> => {
    try {
      const { data: resData } = await http.patch(`/v3/projects/${id}`, data)
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

  delete: async (id: string): Promise<APIResponse<void>> => {
    try {
      await http.delete(`/v3/projects/${id}`)
      return {
        success: true
      }
    } catch (e) {
      console.error(e)
      return {
        success: false
      }
    }
  },
}

export default projectAPI
