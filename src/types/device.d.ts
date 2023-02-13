declare namespace Device {
  namespace Chip {
    interface Instance {
      key : string
      name: string
      type: import('@src/shared/enum/device').DeviceType
    }

    interface ListParams {
      name?: string
      type?: import('@src/shared/enum/device').DeviceType
      model_iter_id?: string
      page: number
      page_size: number
      sort?: 'asc' | 'desc'
    }
    
    interface Option {
      key: Instance['key']
      value: Instance['key']
      label: Instance['name']
    }
  }
}
