declare namespace Model {
  interface Version {
    created: string
    id: string
    name: string
    platform: string
    status: import('@src/shared/enum/model').Model.TrainStatus
    test_accuracy: number
    train_accuracy: number
  }
  interface VersionDetail {
    cover: string
    created: string
    description: string
    id: string
    iter: {
      app_data_args: string,
      application: string,
      begin: string,
      channel: number,
      created: string,
      dataset_id: string,
      description: string,
      end: string,
      engine: string,
      gpu_count: number,
      is_clip: boolean,
      id: string,
      mode: number,
      model_type: string,
      name: string,
      onnx_path: string,
      parent_id: string,
      platform: string,
      reason: string,
      resolution: number,
      result: any,
      status: import('@src/shared/enum/model').Model.TrainStatus
      task_info: {
        current: number
        eta: number
        flows: string[]
        progress: number
      },
      train_task_id: string,
    }
    model_type: import('@src/shared/enum/dataset').DatasetScene
    name: string
  }
}
