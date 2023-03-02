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
}
