declare namespace APIKey {
  type Instance = {
    access_id: string
    created: number
    id: string
    name: string
    recall_url: string
    secret_key: string
    status: import('@shared/enums/apiKey').APIKey.Status
    updated: number
  }

  namespace List {
    type Params = {
      page: number
      page_size: number
    }

    type Response = Promise<import('shared-types').API.ListResponse<Instance>>
  }

  namespace Create {
    type Data = {
      name: string
      recall_url?: string
    }

    type Response = Promise<import('shared-types').API.Response<void>>
  }


}
