import { Dataset } from '@src/shared/types/dataset'
import s3API from '@src/apis/s3'
import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'

const datasetAPI = {
  detail: async (id: Dataset['id']): Promise<APIResponse<Dataset>> => {
    try {
      const { data } = await http.get(`/v3/datasets/${id}`)
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
      const { cover: coverList, name, summary } = dataset
      const { demandDescribe, examples, scene } = workOrder

      let cover: string | undefined
      const exampleUrls: Array<string> = []

      const coverImg = coverList?.length ? coverList[0] : undefined

      if (coverImg) {
        const [...res] = await Promise.all(
          [coverImg, ...examples].map(file => s3API.uploadFile(file))
        )

        const success = res.every(r => r.success)

        if (!success)
          return { success: false }

        const [cUrl, ...eUrl] = res.map(x => x.data)

        cover = cUrl
        if (eUrl) {
          exampleUrls.push(...(eUrl.filter(Boolean) as Array<string>))
        }
      } else {
        
        const [...res] = await Promise.all(
          examples.map(file => s3API.uploadFile(file))
        )

        const success = res.every(r => r.success)

        if (!success)
          return { success: false }

        const eUrl = res.map(x => x.data)

        if (eUrl) {
          exampleUrls.push(...(eUrl.filter(Boolean) as Array<string>))
        }
      }

      const { data } = await http.post('/v3/unmarkedDataset', {
        dataset: {
          cover,
          name,
          summary,
        },
        workOrder: {
          projectId,
          demandDescribe,
          scene,
          exampleUrls,
        },
      })
      
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
