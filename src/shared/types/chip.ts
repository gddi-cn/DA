import { ApplicationScene } from '@src/shared/enum/application'
import { ChipType } from '@src/shared/enum/chip'
import { DatasetScene } from '@src/shared/enum/dataset'
import { ModelTrainMode } from '@src/shared/enum/model'
import React from "react";


// 芯片列表接口参数
export interface ChipListParams {
  // 应用场景
  application: ApplicationScene;
  // 厂商名称
  brand?: string;
  // 芯片类型
  chip_type?: ChipType;
  // 芯片名称
  name?: string;
  // 任务类型
  task_type?: DatasetScene;
}

export type ChipRecommendConfigParams =
  Pick<Chip.Instance, 'name' | 'chip_type' | 'brand'> & { task_type: DatasetScene, mode: ModelTrainMode }

export interface ChipRecommendConfigResponse {
  channel: number;
  fps: number;
  result: number;
}

export interface ChipOption {
  key: string
  value: string
  label: React.ReactNode,
}

