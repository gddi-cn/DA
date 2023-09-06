import http from '@src/utils/http'

const dpAPI = {
  latestVersionURL: async (): Promise<{ success: boolean, data?: VCS.Instance }> => {
    try {
      const { data } = await http.get('/v1/vcs/apps/dp/latest')

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

export default dpAPI
