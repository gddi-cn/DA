import { ApplicationScene } from '@src/shared/enum/application'
import { ModelFalseItem, ModelTrainMode } from '@src/shared/enum/model'

// 创建模型参数
export interface CreateModelData {
  // 芯片场景
  application: ApplicationScene,
  // 数据集 ID
  dataset_id: string,
  // 模型描述
  describe?: string,
  gpu_count: number,
  // 是否公开
  is_public?: boolean,
  model_args: {
    // 模型数据输入路数
    channel: number,
    // DDR 限制
    ddr?: number,
    // 模型帧率
    fps: number,
    // I/O 限制
    io?: number,
    // 算法模式
    mode: ModelTrainMode,
  },
  // 模型名称
  name: string,
  platform: Array<string>
}

// 创建模型结果
export interface CreateModelResponse {
  // 模型 ID
  id: string,
  // 模型版本 ID
  version_id: string,
}

// 模型版本对比列表
export interface ModelCompareVersion {
  // 训练精度
  accuracy: number,
  // 最佳阈值
  best_threshold: number,
  // F-Score
  f_score: number,
  // 模型版本名称
  name: string,
  // 0.01 阈值粒度精度列表(key 为 阈值 * 100, value 为 [精确率 * 100, 召回率 * 100, F1 Score * 100])
  precision_steps: Record<number, [number, number, number]>,
  // 测试精度
  recall: number,
  // 版本标签
  tag: string,
  // 模型版本更新时间
  updated: string,
}

// 模型版本对比
export interface ModelCompare {
  // 数据集 ID
  dataset_id: string,
  // 模型名称
  name: string,
  // 模型对比列表
  versions: ModelCompareVersion[]
}

export interface ModelCompareTableData {
  tag: string,
  dataset_name: string,
  threshold: number,
  fScore: number | string,
  recall: number | string,
  accuracy: number | string,
}

// **************************************************************************************************************
// ============================================  错误分析数据类型  ================================================

// 目标检测错误分析图片 meta 数据
//  - key：图片url
//  - value: Array<[标签， 数字， 数字，数字， 数字]>
export type DetectionFalseItem = Record<string, Array<[string, number, number, number, number]>>

// 通用分割错误分析图片
// - key: 原图链接
// - value: 处理后的图片链接
export type SegmentFalseItem = Record<string, string>

// 姿态检测错误分析图片 meta 数据
export type PoseFalseItem = Record<string, Array<{
  // 检测框
  box: [number, number, number, number, number],
  // 关键点
  keypoint: Array<number>,
  // 标签
  label: string,
}>>

// 单目 3D 错误分析图片 meta 数据
export type CarPoseFalseItem = Record<string, Array<{
  box: [number, number, number, number, number],
  keypoint: Array<number>,
  label: string,
}>>

// 图片分类错误分析图片 meta 数据
export type ClassifyFalseItem = Record<string, [string, number]>

// 目标检测标签错误分析
//  - key1: 正确标签
//  - key2: 错误标签
export type DetectionLabelFalse = Record<string, Record<string,
  {
    // 分数
    cnt: number,
    // 目标检测错误分析图片 meta 数据
    bbox: DetectionFalseItem
  }>>

// 目标检测场景错误分析
//  - key: 错误场景
export type DetectionSceneFalse = Record<ModelFalseItem, {
  // 分数,
  score: number,
  // 目标检测错误分析图片 meta 数据
  bbox: DetectionFalseItem,
  // 建议
  advice: string
}>

// 图片分类标签错误分析
//  - key1: 正确标签
//  - key2: 错误标签
export type ClassifyLabelFalse = Record<string, Record<string,
  {
    // 分数
    cnt: number,
    // 图片分类错误分析图片 meta 数据
    bbox: ClassifyFalseItem
  }>>

// 图片分类场景错误分析
//  - key: 错误场景
export type ClassifySceneFalse = Record<ModelFalseItem, {
  // 分数,
  score: number,
  // 图片分类错误分析图片 meta 数据
  bbox: ClassifyFalseItem,
  // 建议
  advice: string
}>

// 通用分割标签错误分析
//  - key1: 正确标签
//  - key2: 错误标签
export type SegmentLabelFalse = Record<number, Record<number,
  {
    // 分数
    cnt: number,
    // 通用分割错误分析图片 meta 数据
    results: SegmentFalseItem
  }>>

// 通用分割场景错误分析
//  - key: 错误场景
export type SegmentSceneFalse = Record<ModelFalseItem, {
  // 分数
  score: number,
  // 通用分割错误分析图片 meta 数据
  results: SegmentFalseItem,
  // 建议
  advice: string
}>

// 姿态检测标签错误分析
//  - key1: 正确标签
//  - key2: 错误标签
export type PoseLabelFalse = Record<number, Record<number,
  {
    // 分数
    cnt: number,
    // 姿态检测错误分析图片 meta 数据
    results: PoseFalseItem
  }>>

// 姿态检测场景错误分析
//  - key: 错误场景
export type PoseSceneFalse = Record<ModelFalseItem, {
  // 分数
  score: number,
  // 姿态检测错误分析图片 meta 数据
  results: PoseFalseItem,
  // 建议
  advice: string
}>

// 单目 3D 标签错误分析
//  - key1: 正确标签
//  - key2: 错误标签
export type CarPoseLabelFalse = Record<number, Record<number,
  {
    // 分数
    cnt: number,
    // 单目 3D 错误分析图片 meta 数据
    results: CarPoseFalseItem,
  }>>

// 单目 3D 场景错误分析
//  - key: 错误场景
export type CarPoseSceneFalse = Record<ModelFalseItem, {
  // 分数
  score: number,
  // 单目 3D 错误分析图片 meta 数据
  results: CarPoseFalseItem,
  // 建议
  advice: string
}>

// 目标检测错误分析
export interface DetectionFalseAnalysis {
  confusion_matrix: DetectionLabelFalse,
  scene_false: DetectionSceneFalse,
}

// 通用分割错误分析
export interface SegmentFalseAnalysis {
  confusion_matrix: SegmentLabelFalse,
  scene_false: SegmentSceneFalse,
}

// 姿态检测错误分析
export interface PoseFalseAnalysis {
  confusion_matrix: PoseLabelFalse,
  scene_false: PoseSceneFalse,
}

// 单目 3D 错误分析
export interface CarPoseFalseAnalysis {
  confusion_matrix: CarPoseLabelFalse,
  scene_false: CarPoseSceneFalse,
}

// 图片分类错误分析
export interface ClassifyFalseAnalysis {
  confusion_matrix: ClassifyLabelFalse,
  scene_false: ClassifySceneFalse,
}

// 模型错误分析
export type ModelFalseAnalysis =
  DetectionFalseAnalysis | SegmentFalseAnalysis | PoseFalseAnalysis | CarPoseFalseAnalysis | ClassifyFalseAnalysis

export interface ModelFalseAnalysisItem {
  uid: string,
  score: number,
  sceneTip: {
    label: string,
    advice: string,
  },
  labelTip: {
    correctLabel: string,
    wrongLabel: string,
    wrongNum: number,
  }
  dataList: Array<any>,
}

// ============================================  错误分析数据类型  ================================================
// **************************************************************************************************************
