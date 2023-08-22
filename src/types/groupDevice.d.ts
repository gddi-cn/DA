declare namespace GroupDevice {
  type Instance = {
    chip: string
    create_time: number
    expire: number
    id: number
    match: boolean
    max_process: number
    name: string
    sn: string
    state: string
    type: string
    update_time: number
    is_test: boolean
  }

  namespace List {
    interface Params {
      device_chip_id?: Device.Chip.Instance['key']
      name?: string
      page: number
      page_size: number
      type?: import('@src/shared/enum/device').DeviceType
      sort: 'asc' | 'desc'
      sort_by: 'name' | 'registered_time'
    }

    type Response = Promise<import('@src/shared/types/api').APIListResponse<Instance>>
  }
}
