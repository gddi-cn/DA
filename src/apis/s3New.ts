import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

const s3API = {
  uploadFile: async (file: File): Promise<APIResponse<string>> => {
    try {
      const { name: filename, size } = file

      const {
        data: {
          file_url,
          header: headers,
          method,
          url,
        }
      } = await http.get('/v2/file/upload', { params: { filename, size } })

      await http[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](url, file, { headers })

      return {
        success: true,
        data: file_url,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },
}

export default s3API
