export enum ModelTrainMode {
  CUSTOM,
  ACC,
  SPEED,
}

// 模型错误分析类新
export enum ModelFalseType {
  // 场景错误
  SCENE = 'scene',
  // 标签错误
  LABEL = 'label',
}

// 数据分析类别
export enum ModelFalseItem {
  // 拍摄光照质量
  BRIGHTNESS = 'brightness',
  // 目标尺寸
  SMALL = 'small',
  // 拍摄光照质量
  UNDEREXPOSED = 'underexposed',
  // 目标尺寸
  SMALL_DETECT = 'small_detect',
  // 目标完整性
  OCCLUSION = 'occlusion',
  // 数据均衡度
  LONG_TAIL = 'long_tail',
  // 类别可区分性
  FINE_GRAIN = 'fine_grain',
  // 场景丰富度
  MULTI_SCALE = 'multi_scale',
  // 目标密集度
  INTENSIVE = 'intensive',
  // 图片数据量
  FEW_SHOT = 'few_shot',
  // 大姿态比例
  POSE_DIVERSITY = 'pose_diversity'
}
