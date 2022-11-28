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