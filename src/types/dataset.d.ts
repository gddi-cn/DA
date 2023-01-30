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
}