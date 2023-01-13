import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

export const userAPI = {
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
}

export default userAPI
