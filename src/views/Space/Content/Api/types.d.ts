declare namespace API {
  interface SearchParams {
    page: number
    page_size: number
  }

  interface Instance {
    access_id: string
    created: number
    id: string
    name: string
    recall_url: string
    secret_key: string
    status: import('../enums').Space.API.Status
    updasted: number
  }

  interface CreateData {
    name: string
    callback_url?: string
  }
}
