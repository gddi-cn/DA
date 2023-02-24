import { AnalyzeItem, DatasetDownloadStatus, DatasetScene } from '@src/shared/enum/dataset'

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

export interface DatasetClass {
  annotation_count: number
  cover: string
  name: string
}

export interface SubDataset {
  annotation_count: number
  class_count: number
  id: string
  image_count: number
  size: number
}

export interface Dataset {
  cover: string,
  created: number,
  download: {
    status: DatasetDownloadStatus,
    url?: string,
  },
  id: string,
  name: string,
  scene: DatasetScene,
  status: number,
  summary: string,
  is_public:boolean,
  meta: Meta,
  reason:string,
  train_set: SubDataset,
  val_set: SubDataset,
  assess: Record<string, number>,
  updated: number,
  username: string,
}

export interface DataAnalyzeSuggestion {
  excellent: [string, string],
  great: [string, string],
  notBad: [string, string],
  bad: [string, string],
}

export interface DataAnalyzeTip {
  name: string,
  description: string,
  explain: string,
  suggestion: DataAnalyzeSuggestion,
}


export interface AnalyzeImage {
  input: any,
  inputTip: string,
  output: any,
  outputTip: string,
  inputColor?: string,
  outputColor?: string,
}

export interface AnalyzeData {
  sign: AnalyzeItem,
  score: number,
  tip?: DataAnalyzeTip,
  img?: AnalyzeImage,
}

