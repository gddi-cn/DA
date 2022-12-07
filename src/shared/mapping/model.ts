import { ModelFalseItem, ModelFalseType } from '@src/shared/enum/model'
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
