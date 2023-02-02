declare namespace Dataset {
  interface KeyPoint {
    joint_weight: number
    name: string
    sigmas: number
    swap: string
    type: string
  }

  interface Skeleton {
    start: string
    end: string
  }

  interface Meta {
    keypoint: Array<KeyPoint>
    skeleton: Array<Skeleton>
  }

  namespace Import {
    namespace History {
      interface ListParams {
        source?: import('@src/shared/enum/dataset').DatasetImportSource
        status?: import('@src/shared/enum/dataset').DatasetImportStatus
      }
      interface Instance {
        created: number
        filename: string
        size: number
        source: import('@src/shared/enum/dataset').DatasetImportSource
        status: import('@src/shared/enum/dataset').DatasetImportStatus
      }
    }
  }
}
