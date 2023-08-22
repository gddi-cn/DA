import { APIResponse } from '@src/shared/types/api'
import http from '@src/utils/http'
import { ApplicationScene } from '@src/shared/enum/application'
import {
  ChipListParams,
  ChipRecommendConfigParams,
  ChipRecommendConfigResponse
} from '@src/shared/types/chip'

const chipAPI = {
  brandList: async (scene: ApplicationScene): Promise<APIResponse<Array<Chip.Brand>>> => {
    try {
      const { data } = await http.get(`/v3/capacity/${scene}/brands`)
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

  chipList: async (params: ChipListParams): Promise<APIResponse<Array<Chip.Instance>>> => {
    try {
      const { data } = await http.get(`/v3/capacity/${params.application}/chips`, { params })
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

  fetchRecommendConfig: async (application: ApplicationScene, params: ChipRecommendConfigParams):
    Promise<APIResponse<ChipRecommendConfigResponse>> => {
    try {
      const { data } = await http.get(`/v3/capacity/${application}/value`, { params: { ...params, fps: 5, channel: 1 } })
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

export default chipAPI
