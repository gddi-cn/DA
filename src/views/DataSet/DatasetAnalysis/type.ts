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

export enum ScoreClass {
  Excellent = 'excellent',
  Great = 'great',
  NotBad = 'notBad',
  Bad = 'bad'
}

export enum AnalyzeItem {
  ImageSize = 'image_size',
  SceneDiversity = 'scene_diversity',
  FineGrain = 'fine_grain',
  LongTail = 'long_tail',
  FewShot = 'few_shot',
  Underexposed = 'underexposed',
  SmallDetect = 'small_detect',
  Intensive = 'intensive',
  Occlusion = 'occlusion',
  MultiScale = 'multi_scale',
}

export interface AnalyzeImage {
  input: any,
  inputTip: string,
  output: any,
  outputTip: string,
}

export interface AnalyzeData {
  sign: AnalyzeItem,
  score: number,
  tip?: DataAnalyzeTip,
  img?: AnalyzeImage,
}

export interface RadarProps {
  dataList: Array<AnalyzeData>,
  onItemChange?(item?: AnalyzeItem): void
}

export type DetailProps = {
  detail: {
    [p in keyof AnalyzeData]?: AnalyzeData[p]
  }
}

export enum DatasetScene {
  Detection = 'detection',
  Classify = 'classify',
  CityscapesSegment = 'cityscapes_segment',
  PortraitSegment = 'portrait_segment',
  Monocular3DDetection = 'monocular_3d_detection',
  PoseDetection = 'pose_detection',
  CarPoseDetection = 'car_pose_detection'
}
