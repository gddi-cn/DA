declare namespace Project {
  interface Detail {
    additional: {
      cover: string
      eta: number
      model_type: import('@shared/enum/dataset').DatasetScene
      platform: string
      status: import('@shared/enum/model').Model.TrainStatus
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
    model_type?: import('@src/shared/enum/dataset').DatasetScene
    model_status?: import('@src/shared/enum/model').Model.TrainStatus
    chip?: string
    sort?: 'asc' | 'desc'
    order?: 'created' | 'updated'
  }
}
