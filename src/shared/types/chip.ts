import { ApplicationScene } from '@src/shared/enum/application'
import { ChipBrand, ChipName, ChipType } from '@src/shared/enum/chip'
import { DatasetScene } from '@src/shared/enum/dataset'
import { ModelTrainMode } from '@src/shared/enum/model'
import React from "react";

// 芯片
export interface Chip {
  // 应用场景
  application: ApplicationScene;
  // 芯片品牌
  brand: ChipBrand;
  // 最大支持 Channel 数
  channel_limited: number;
  // 芯片类型
  chip_type: ChipType;
  // 最大支持 FPS
  fps_limited: number;
  // 芯片名称
  name: ChipName;
  // 说明
  summary: string;
  // 芯片说明链接
  url: string;
  // 热门芯片
  is_hot: boolean;
  // 过滤后的副本设为 true 以便实现只能高亮选中一个
  _copy?: boolean;
  // 最大分辨率
  resolution_limited: number;
}

// 芯片列表接口参数
export interface ChipListParams {
  // 应用场景
  application: ApplicationScene;
  // 厂商名称
  brand?: ChipBrand;
  // 芯片类型
  chip_type?: ChipType;
  // 芯片名称
  name?: string;
  // 任务类型
  task_type?: DatasetScene;
}

export type ChipRecommendConfigParams =
  Pick<Chip, 'name' | 'chip_type' | 'brand'> & { task_type: DatasetScene, mode: ModelTrainMode }

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