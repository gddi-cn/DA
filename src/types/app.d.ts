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
    //
    name: string
    type: import('@src/shared/enum/device').DeviceType
    update_time: number
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
  }

  namespace Template {
    interface Instance {
      advance: boolean
      config_url: string
      cover: string
      description: string
      id: number
      name: string
      sample: string
    }

    interface ListParams {
      public_type?: import('@src/shared/enum/application').ApplicationTemplateType
      device_type?: import('@src/shared/enum/device').DeviceType
      device_type_id?: Device.Chip.Instance['key']
      page_size: number
      page: number
      sort?: 'asc' | 'desc'
    }
  }
}