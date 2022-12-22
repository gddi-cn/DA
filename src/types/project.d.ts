declare namespace Project {
  interface Detail {
    additional: {
      cover: string
      eta: number
      model_type: string
      platform: string
      status: number
    }
    created: number
    dataset: {
      id: string
    }
    id: string
    model: {
      id: string
      version_id: string
    }
    name: string
    phase: import('@src/shared/enum/project').ProjectPhase
    status: import('@src/shared/enum/project').ProjectStatus
    updated: number
    worker_order: Pick<Order.Detail, 'id' | 'status'>
  }

  interface ListParams extends Partial<Pick<Project.Detail, 'name' | 'status' | 'phase'>>{
    page: number
    page_size: number,
    sort?: 'asc' | 'desc'
    order?: 'created' | 'updated'
  }
}