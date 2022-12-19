import http from '@src/utils/http'
import { UploadFile } from 'antd'

const s3API = {
  uploadFile: async (file: UploadFile) => {
    const { name, size } = file
    console.log({ file, name, size })
  }
}

export default s3API

