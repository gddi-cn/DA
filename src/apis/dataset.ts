import { Dataset } from '@src/shared/types/dataset'
import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'

const datasetAPI = {
  applyDownload: async (id: Dataset['id']): Promise<APIResponse<void>> => {
    try {
      await http.post(`/v3/datasets/${id}/download`)
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

export default datasetAPI
