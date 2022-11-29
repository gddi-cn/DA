// 数据集下载状态
export enum DatasetDownloadStatus {
  // 未知
  UNKNOWN = 'unknown',
  // 下载中
  DOWNLOADING = 'downloading',
  // 下载失败
  FAILED = 'failed',
  // 下载成功
  SUCCESS = 'success'
}

export enum DatasetScene {
  Detection = 'detection',
  Classify = 'classify',
  CityscapesSegment = 'cityscapes_segment',
  PoseDetection = 'pose_detection',
  CarPoseDetection = 'car_pose_detection',
  KeyPointsBasedAction = 'keypoints_based_action'
}

export enum ScoreClass {
  Excellent = 'excellent',
  Great = 'great',
  NotBad = 'notBad',
  Bad = 'bad'
}

export enum AnalyzeItem {
  ImageSize = 'image_size',
  FineSize = 'fine_size', // 兼容旧数据
  ImgDiscrimination = 'img_discrimination', // 兼容旧数据
  SceneDiversity = 'scene_diversity',
  FineGrain = 'fine_grain',
  // LongTail = 'long_tail',
  LongTail = 'long_tail_bak',
  FewShot = 'few_shot',
  Underexposed = 'underexposed',
  SMALL_DETECT = 'small_detect',
  Intensive = 'intensive',
  Occlusion = 'occlusion',
  MultiScale = 'multi_scale',
  AREA = 'area',
  ACTION_DURATION = 'action_duration',
  DISTINCT_DEGREE = 'distinct_degree',
  KEY_POINTS_VISIBILITY = 'keypoints_visibility',
  LONG_TAIL_ACTION = 'long_tail',
  // AREA = 'area_action',
  // ACTION_DURATION = 'action_duration_action',
  // DISTINCTION_DEGREE = 'distinction_degree_action',
  // KEY_POINTS_VISIBILITY = 'keypoints_visibility_action',
  // LONG_TAIL_ACTION = 'long_tail_action',
}
