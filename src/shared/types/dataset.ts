import { DatasetDownloadStatus } from '@src/shared/enum/dataset'

export interface Dataset {
  cover: string,
  created: number,
  download: {
    status: DatasetDownloadStatus,
    url?: string,
  },
  id: string,
  name: string,
  scene: string,
  status: number,
  summary: string,
  is_public:boolean,
  reason:string,
  train_set: {
    annotation_count: number
    class_count: number
    id: string
    image_count: number
    size: number
  },
  val_set: {
    annotation_count: number
    class_count: number
    id: string
    image_count: number
    size: number
  },
  assess: Record<string, number>,
  updated: number,
  username: string,
}