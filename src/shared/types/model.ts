import { ApplicationScene } from '@src/shared/enum/application'
import { ModelTrainMode } from '@src/shared/enum/model'

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