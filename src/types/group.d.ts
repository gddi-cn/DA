declare namespace Group {
  type Instance = {
    device_count: number
    id: number
    name: string
    online_device_count: number
    type: import('@src/shared/enum/device').DeviceType
    update_time: number
  }

  namespace List {
    interface Params {
      name?: string
      type?: import('@src/shared/enum/device').DeviceType
      app_id?: number
      page: number
      page_size: number
    }
    type Response = Promise<import('@src/shared/types/api').APIListResponse<Instance>>
  }
}
