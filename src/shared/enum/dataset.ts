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
  // 目标检测
  Detection = 'detection',
  // 图片分类
  Classify = 'classify',
  // 通用分割
  CityscapesSegment = 'cityscapes_segment',
  // 姿态检测
  PoseDetection = 'pose_detection',
  // 单目 3D
  CarPoseDetection = 'car_pose_detection',
  // 动作识别
  KeyPointsBasedAction = 'keypoints_based_action',
  // 关键点检测
  KeypointsDetection = 'keypoint_detection',
  // 图像检索
  ImageRetrieval = 'image_retrieval'
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
  LongTail = 'long_tail',
  // LongTail = 'long_tail_bak',
  FewShot = 'few_shot',
  Underexposed = 'underexposed',
  SMALL_DETECT = 'small_detect',
  Intensive = 'intensive',
  Occlusion = 'occlusion',
  MultiScale = 'multi_scale',
  RAW_AREA = 'area',
  RAW_ACTION_DURATION = 'action_duration',
  RAW_DISTINCTION_DEGREE = 'distinct_degree',
  RAW_KEY_POINTS_VISIBILITY = 'keypoints_visibility',
  RAW_LONG_TAIL_ACTION = 'long_tail',
  AREA = 'area_action',
  ACTION_DURATION = 'action_duration_action',
  DISTINCTION_DEGREE = 'distinct_degree_action',
  KEY_POINTS_VISIBILITY = 'keypoints_visibility_action',
  LONG_TAIL_ACTION = 'long_tail_action',
}

export enum DatasetCreateType {
  UPLOAD_UNREMARKED = 1,
  UPLOAD_REMARKED,
  IMPORT_THIRD_PARTY,
}

export enum UnmarkedDatasetCreateStep {
  META = 1,
  REQUIREMENT,
  PROGRESSING,
}

export enum DatasetImportStatus {
  MERGING = 1,
  COMPRESSING,
  VERIFYING,
  VERIFY_FAILED,
  VERIFY_SUCCESS,
  IMPORTING,
  IMPORT_FAILED,
}
