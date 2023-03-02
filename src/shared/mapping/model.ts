import { Model, ModelFalseItem, ModelFalseType } from '@src/shared/enum/model'
import { AnalyzeItem } from '@src/shared/enum/dataset'

export const modelFalseTypeNameMapping: Map<ModelFalseType, string> = new Map([
  [ModelFalseType.SCENE, /* */'场景错误识别分析'],
  [ModelFalseType.LABEL, /* */'标签错误识别分析'],
])

export const modelAnalyzeItemNameMapping: Map<AnalyzeItem, string> = new Map([
  [AnalyzeItem.ImageSize,/*             */ '图片尺寸'],
  [AnalyzeItem.FineSize,/*              */ '图片尺寸'],
  [AnalyzeItem.SceneDiversity,/*        */ '场景丰富度'],
  [AnalyzeItem.ImgDiscrimination,/*     */ '场景丰富度'],
  [AnalyzeItem.FineGrain,/*             */ '细粒度'],
  [AnalyzeItem.LongTail,/*              */ '类别均衡度'],
  [AnalyzeItem.FewShot,/*               */ '小样本分布'],
  [AnalyzeItem.Underexposed,/*          */ '光照质量'],
  [AnalyzeItem.SMALL_DETECT,/*          */ '目标尺寸'],
  [AnalyzeItem.Intensive,/*             */ '目标分散度'],
  [AnalyzeItem.Occlusion,/*             */ '目标完整度'],
  [AnalyzeItem.MultiScale,/*            */ '尺寸均衡度'],
  [AnalyzeItem.AREA,/*                  */ '目标尺寸'],
  [AnalyzeItem.LONG_TAIL_ACTION,/*      */ '类别均衡度'],
  [AnalyzeItem.ACTION_DURATION,/*       */ '动作持续时间'],
  [AnalyzeItem.DISTINCTION_DEGREE,/*    */ '动作幅度'],
  [AnalyzeItem.KEY_POINTS_VISIBILITY,/* */ '关键点遮挡'],
])

export const modelFalseItemNameMapping: Map<ModelFalseItem, string> = new Map([
  [ModelFalseItem.BRIGHTNESS, /*     */'拍摄光照质量'],
  [ModelFalseItem.SMALL, /*          */'目标尺寸'],
  [ModelFalseItem.UNDEREXPOSED, /*   */'拍摄光照质量'],
  [ModelFalseItem.SMALL_DETECT, /*   */'目标尺寸'],
  [ModelFalseItem.OCCLUSION, /*      */'目标完整性'],
  [ModelFalseItem.LONG_TAIL, /*      */'数据均衡度'],
  [ModelFalseItem.FINE_GRAIN, /*     */'类别可区分度'],
  [ModelFalseItem.MULTI_SCALE, /*    */'场景丰富度'],
  [ModelFalseItem.INTENSIVE, /*      */'目标密集度'],
  [ModelFalseItem.FEW_SHOT, /*       */'图片数据量'],
  [ModelFalseItem.POSE_DIVERSITY, /* */'大姿态比例'],
])

export const modelTrainStatusNameMapping: Map<Model.TrainStatus, string> = new Map([
  [Model.TrainStatus.NOT_START, /* */'未开始训练'],
  [Model.TrainStatus.TRAINING, /*  */'预计完成训练还需：'],
  [Model.TrainStatus.SUCCESS, /*   */'训练成功'],
  [Model.TrainStatus.FAILED, /*    */'训练失败'],
  [Model.TrainStatus.WAITING, /*   */'等待中'],
])

export const modelVersionStatusNameMapping: Map<Model.TrainStatus, string> = new Map([
  [Model.TrainStatus.NOT_START, /* */'未开始'],
  [Model.TrainStatus.TRAINING, /*  */'训练中'],
  [Model.TrainStatus.SUCCESS, /*   */'成功'],
  [Model.TrainStatus.FAILED, /*    */'失败'],
  [Model.TrainStatus.WAITING, /*   */'等待中'],
])

export const modelVersionTipMapping: Map<Model.TrainStatus, string> = new Map([
  [Model.TrainStatus.NOT_START, /* */'该模型版本未开始训练'],
  [Model.TrainStatus.TRAINING, /*  */'该模型版本正在训练'],
  [Model.TrainStatus.SUCCESS, /*   */'该模型版本训练成功'],
  [Model.TrainStatus.FAILED, /*    */'该模型版本训练失败'],
  [Model.TrainStatus.WAITING, /*   */'该模型版本未开始训练'],
])

export const modelTrainStatusColorMapping: Map<Model.TrainStatus, string> = new Map([
  [Model.TrainStatus.NOT_START, /* */'#637381'],
  [Model.TrainStatus.TRAINING, /*  */'#48a2df'],
  [Model.TrainStatus.SUCCESS, /*   */'#2ec16b'],
  [Model.TrainStatus.FAILED, /*    */'#ff6177'],
  [Model.TrainStatus.WAITING, /*   */'#637381'],
])

export const modelTrainStatusBgColorMapping: Map<Model.TrainStatus, string> = new Map([
  [Model.TrainStatus.NOT_START, /* */'#e4e5e6'],
  [Model.TrainStatus.TRAINING, /*  */'#edf7fd'],
  [Model.TrainStatus.SUCCESS, /*   */'#edfaf3'],
  [Model.TrainStatus.FAILED, /*    */'#f9eef0'],
  [Model.TrainStatus.WAITING, /*   */'#e4e5e6'],
])
