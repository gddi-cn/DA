import { APIResponse } from '@src/shared/types/api'
import { ChipBrand } from '@src/shared/enum/chip'
import http from '@src/utils/http'
import { ApplicationScene } from '@src/shared/enum/application'
import { Chip, ChipListParams, ChipRecommendConfigParams, ChipRecommendConfigResponse } from '@src/shared/types/chip'

const chipAPI = {
  brandList: async (scene: ApplicationScene): Promise<APIResponse<Array<ChipBrand>>> => {
    try {
      const { data } = await http.get(`/v3/capacity/${scene}/brands`)
      return {
        success: true,
        data: (data || []).map((x: any) => x.name).filter(Boolean),
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
      }
    }
  },

  chipList: async (params: ChipListParams): Promise<APIResponse<Array<Chip>>> => {
    try {
      const { data }: { data: Array<Chip> } = await http.get(`/v3/capacity/${params.application}/chips`, { params })
      return {
        success: true,
        // data: data.map(x => ({ ...x, name: (x.name as string) === 'SE5' ? 'BM1684' : x.name })) as Array<Chip>, // 将 SE5 改成 BM1684
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
