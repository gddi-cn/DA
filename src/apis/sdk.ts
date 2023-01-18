import http from '@src/utils/http'
import { APIResponse } from "@src/shared/types/api"

const sdkAPI = {
  documentList: async (params: SDK.Document.ListParams):
    Promise<APIResponse<Array<SDK.Document.Instance>>> => {
    try {
      const { data } = await http.get('/v3/sdkdocs', { params })
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
  }
}

export default sdkAPI
