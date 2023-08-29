import { Dataset, Dataset as IDataset, DatasetClass, SubDataset } from '@src/shared/types/dataset'
import s3API from '@src/apis/s3'
import http from '@src/utils/http'
import { APIResponse } from '@src/shared/types/api'

const datasetAPI = {
  detail: async (id: IDataset['id']): Promise<APIResponse<IDataset>> => {
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

  create: async (data: Dataset.Create.Data): Dataset.Create.Response => {
    try {
      const { data: _data } = await http.post('/v3/datasets', data)
      return {
        success: true,
        data: _data,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  applyDownload: async (id: IDataset['id']): Promise<APIResponse<void>> => {
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
  },

  importHistory: async (
    id: string,
    params: Dataset.Import.History.ListParams
  ): Promise<APIResponse<Array<Dataset.Import.History.Instance>>> => {
    try {
      const { data } = await http.get(`/v3/datasets/${id}/import`, { params })
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

  classes: async (
    datasetId: Dataset['id'],
    subDatasetId: SubDataset['id']
  ): Promise<APIResponse<Array<DatasetClass>>> => {
    try {
      const { data } = await http.get(`/v3/datasets/${datasetId}/sub-datasets/${subDatasetId}/classes`)
      return {
        data,
        success: true,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  update: async (id: string, data: { name: string, summary?: string, cover?: string }): Promise<{ success: boolean }> => {
    try {
      await http.patch(`/v3/datasets/${id}`, data)
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

  assess: async(id: string): Dataset.Analysis.Get.Response => {
    try {
      const { data } = await http.get(`/v3/datasets/${id}/assess`)
      return {
        success: true,
        data,
      }
    } catch(e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  createAssess: async (id: string): Promise<{ success: boolean }> => {
    try {
      await http.post(`/v3/datasets/${id}/assess`)
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
