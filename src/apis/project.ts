import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { UpdateProjectData, UpdateProjectResponse } from '@src/shared/types/project'

const projectAPI = {
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
}

export default projectAPI
