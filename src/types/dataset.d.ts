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

  namespace Create {
    interface Data {
      bucket?: string
      cover?: string
      filename: string
      hash: string
      key?: string
      name: string
      scene: import("@src/shared/enum/dataset").DatasetScene
      size: number
      source: number
      summary?: string
      url?: string
      val_share?: number
    }

    type Response = Promise<import('@src/shared/types/api').APIResponse<{ id: string }>>
  }

  namespace Analysis {
    type Assess = {
      progress: number
      result: {
        assess_detail: Record<string, number>
        is_chip_available: boolean
        resolution: number[]
      }
      status: import('@src/shared/enum/dataset').DatasetAnalysisStatus
    }

    namespace Get {
      type Response = Promise<{ success: boolean, data?: Assess }>
    }

  }
}
