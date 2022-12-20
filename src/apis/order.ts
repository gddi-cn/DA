import {APIResponse} from "@src/shared/types/api";
import http from "@src/utils/http";

const orderAPI = {
  detail: async (id: Order.Detail['id']): Promise<APIResponse<Order.Detail>> => {
    try {
      const { data } = await http.get(`/v3/workOrders/${id}`)

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

export default orderAPI
