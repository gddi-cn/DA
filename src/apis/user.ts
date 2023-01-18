import { APIListResponse, APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { User as UserEnum } from '@src/shared/enum/user'

export const userAPI = {
  info: async (): Promise<APIResponse<User.Instance>> => {
    try {
      const { data } = await http.get('/v1/users/info')

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

  usage: async (): Promise<APIResponse<User.Usage>> => {
    try {
      const { data } = await http.get('/v3/user/usage')
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

  consumes: async (params: User.Consume.ListParams): Promise<APIListResponse<User.Consume.Instance>> => {
    try {
      if (params.consume_type === UserEnum.Consume.Type.ALL)
        delete (params as any).consume_type

      const { data } = await http.get('/v3/user/consumes', { params })
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

  update: async (data: User.UpdateData): Promise<APIResponse<void>> => {
    try {
      await http.patch('/v3/user', data)
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

  updatePwd: async (data: User.UpdatePwdData): Promise<APIResponse<void>> => {
    try {
      await http.patch('/v1/users/chpwd', data)
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

export default userAPI
