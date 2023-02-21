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

  interface Instance {
    chip: stirng
    create_time: number
    expire: number
    id: number
    match: boolean
    name: string
    sn: string
    state: import('@shared/enum/devices').GroupDeviceState
    type: string
    update_time: string
  }

  interface Sync {
    app_id: number
    app_name: string
    sync_state: 'Done' | 'InProgress' | 'Failure'
    deleted: boolean
  }

  interface SyncInstance extends Instance {
    sync_state: 'Done' | 'InProgress' | 'Failure'
    syncs: Array<Sync>
  }
}
