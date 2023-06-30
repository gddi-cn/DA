declare namespace CloudAuth {
  type SimpleDevice = {
    created: number
    name: string
    sn: string
    type: string
  }

  type Instance = {
    app_id: App.Instance['id']
    app_name: App.Instance['name']
    call_count: number
    call_remind: number
    created: number
    devices: SimpleDevice[]
    expire: number
    id: string
    license_type: 1 | 2 | 3 | 4 | 5
    model_name: string
    model_id: string
    model_version_id: string
    quantity: number
    status: 1 | 2 | 3 | 4
    updated: number
  }

  namespace List {
    interface Params extends
      Partial<
        Pick<
          CloudAuth.Instance, 'app_id' | 'app_name' | 'model_name'
        >
      >
    {
      page: number,
      page_size: number,
      model_id?: string
    }

    type Response = Promise<import('@src/shared/types/api').APIListResponse<CloudAuth.Instance>>
  }

  namespace Create {
    interface Data {
      app_id: CloudAuth.Instance['app_id']
      request_days: number
    }

    type Response = Promise<import('@src/shared/types/api').APIResponse<void>>
  }
}