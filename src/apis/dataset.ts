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
  },

  createUnRemarked: async (
    dataset: Unremarked.Form.Base,
    workOrder: Unremarked.Form.Requirement,
    projectId: string,
  ): Promise<APIResponse<string>> => {
    try {
      const { cover: coverList } = dataset
      const { demandDescribe, examples, scene } = workOrder

      // const { data } = await http.post('/v3/unmarkedDataset', {
      //   dataset,
      //   workOrder: { ...workOrder, projectId }
      
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
  }
}

export default datasetAPI
