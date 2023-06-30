import http from '@src/utils/http'

const cloudAuthAPI = {
  lsit: async (params: CloudAuth.List.Params): CloudAuth.List.Response => {
    try {
      const { data } = await http.get('/v3/cloudauths', { params })
      return {
        success: true,
        data,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false
      }
    }
  },

  create: async (data: CloudAuth.Create.Data): CloudAuth.Create.Response => {
    try {
      await http.post('/v3/cloudauths', data)
      return {
        success: true,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false
      }
    }
  },
}

export default cloudAuthAPI
