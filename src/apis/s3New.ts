import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'

type S3TokenRes = {
  additional: {
    allowed_bucket: string[]
    token_expire: number
  },
  s3_server: {
    accessKeyId: string
    endpoint: string
    region: string
    s3ForcePathStyle: boolean
    secretAccessKey: string
    sessionToken: string
    sslEnabled: boolean
  }
}

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
  getToken: async (): Promise<APIResponse<S3TokenRes>> => {
    try {
      const { data } = await http.get('/v2/storage/s3/token')
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

export default s3API
