declare namespace App {
  // 应用
  interface Instance {
    // 适配设备
    adapter_device: string
    // 配置链接
    config_url: string
    // 应用已配置
    configured: boolean
    // 封面
    cover: string
    create_time: number
    // 描述
    description: string
    // ID
    id: number
    input: import('@src.shared/enum/applicaiton').AppTemplateInput
    // 模型列表
    models: Array<Model>
    // 名称
    name: string
    template_name: string
    type: import('@src/shared/enum/device').DeviceType
    update_time: number
  }

  interface Model {
    create_time: number
    id: number
    name: string
  }

  interface CreateData {
    adapter_device: Device.Chip.Instance['key']
    app_template_id: App.Template.Instance['id']
    model_iter_id: string
    cover?: string
    description?: string
    name: string
  }

  interface CreateForm {
    adapter_device: Device.Chip.Instance['key']
    app_template_id: App.Template.Instance['id']
    cover?: import('antd').UploadFile[]
    description?: string
    name: string
  }

  interface ListParams {
    name?: string
    device?: Device.Chip.Instance['key']
    model_iter_id?: string
    page: number
    page_size: number
    sort?: 'asc' | 'desc'
    label?: string
    input?: import ('@src/shared/enum/application').AppTemplateInput
  }

  namespace Sync {
    interface Device {
      chip: stirng
      create_time: number
      expire: number
      id: number
      match: boolean
      name: string
      sn: string
      state: 'online' | 'offline'
      sync_state: 'Done' | 'InProgress' | 'Failure'
      syncs: Array<{ app_name: string, sync_state: 'Done' | 'InProgress' | 'Failure' }>
      type: string
      update_time: number
    }

    interface Reacord {
      config_url: string
      create_time: number
      devices: Array<Device>
      failed_count: number
      group_id: number
      group_name: string
      id: number
      pending_count: number
      success_count: number
      sync_state: 'Done' | 'InProgress'
      total: number
    }
  }

  namespace Template {
    interface Instance {
      advance: boolean
      config_url: string
      cover: string
      description: string
      id: number
      input: string
      labels: Array<string>
      name: string
      sample: string
    }

    interface ListParams {
      public_type?: import('@src/shared/enum/application').ApplicationTemplateType
      device_type?: import('@src/shared/enum/device').DeviceType
      name?: string
      label?: string
      input?: import('@src/shared/enum/applicaiton').AppTemplateInput
      device_type_id?: Device.Chip.Instance['key']
      page_size: number
      page: number
      sort?: 'asc' | 'desc'
    }
  }
}
