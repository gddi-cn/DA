import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'
import { UploadFile } from 'antd'

const s3API = {
  uploadFile: async (file: UploadFile): Promise<APIResponse<string>> => {
    try {
      const rawFile = file.originFileObj

      if (!rawFile) return { success: false }

      const { name: filename, size } = rawFile

      const { data: { file_url, header: headers, method, url } } =
        await http.get('/v2/file/upload', { params: { filename,  size } })

      await http[method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'](url, rawFile, { headers })

      return {
        success: true,
        data: file_url,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false
      }
    }
  }
}

export default s3API

