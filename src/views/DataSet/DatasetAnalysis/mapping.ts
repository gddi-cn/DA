import { AnalyzeImage, AnalyzeItem, DataAnalyzeTip, DatasetScene } from './type'

import fewShot0 from './analysisImg/few_shot_0.png'
import fewShot1 from './analysisImg/few_shot_1.png'
import fine0 from './analysisImg/fine_0.png'
import fine1 from './analysisImg/fine_1.png'
import intensive0 from './analysisImg/intensive_0.png'
import intensive1 from './analysisImg/intensive_1.png'
import longTail0 from './analysisImg/long_tail_0.png'
import longTail1 from './analysisImg/long_tail_1.png'
import multiScale0 from './analysisImg/multi_scale_0.png'
import multiScale1 from './analysisImg/multi_scale_1.png'
import occlusion0 from './analysisImg/occlusion_0.png'
import occlusion1 from './analysisImg/occlusion_1.png'
import scene0 from './analysisImg/scene_0.png'
import scene1 from './analysisImg/scene_1.png'
import size0 from './analysisImg/size_0.png'
import size1 from './analysisImg/size_1.png'
import smallDetect0 from './analysisImg/small_detect_0.png'
import smallDetect1 from './analysisImg/small_detect_1.png'
import underexposed0 from './analysisImg/underexposed_0.png'
import underexposed1 from './analysisImg/underexposed_1.png'

export const nameItemMapping = [
  { name: '图片尺寸', item: AnalyzeItem.ImageSize },
  { name: '图片尺寸', item: AnalyzeItem.FineSize},
  { name: '场景丰富度', item: AnalyzeItem.SceneDiversity },
  { name: '场景丰富度', item: AnalyzeItem.ImgDiscrimination },
  { name: '细粒度', item: AnalyzeItem.FineGrain },
  { name: '类别均衡度', item: AnalyzeItem.LongTail },
  { name: '小样本分布', item: AnalyzeItem.FewShot },
  { name: '光照质量', item: AnalyzeItem.Underexposed },
  { name: '目标尺寸', item: AnalyzeItem.SmallDetect },
  { name: '目标分散度', item: AnalyzeItem.Intensive },
  { name: '目标完整度', item: AnalyzeItem.Occlusion },
  { name: '尺寸均衡度', item: AnalyzeItem.MultiScale },
]

export const tipMapping: Map<AnalyzeItem, DataAnalyzeTip> = new Map([
  [
    AnalyzeItem.ImageSize,
    {
      name: '图片尺寸',
      description: '数据集图片尺寸综合质量',
      explain: '小尺寸图片数占数据总数的比值越小，该指标数值越大，数据集的尺寸良品率越高，质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加大尺寸图片或高分辨率图片'],
        bad: ['数据集表现较差', '建议增加更多大尺寸或高分辨率图片'],
      },
    },
  ],
  [
    AnalyzeItem.FineSize,
    {
      name: '图片尺寸',
      description: '数据集图片尺寸综合质量',
      explain: '小尺寸图片数占数据总数的比值越小，该指标数值越大，数据集的尺寸良品率越高，质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加大尺寸图片或高分辨率图片'],
        bad: ['数据集表现较差', '建议增加更多大尺寸或高分辨率图片'],
      },
    },
  ],
  [
    AnalyzeItem.SceneDiversity,
    {
      name: '场景丰富度',
      description: '图片所覆盖的场景丰富程度',
      explain: '图片间特征的差异度越大，该指标数值越大，数据集的场景丰富度越高。',
      suggestion: {
        excellent: ['数据集场景丰富度较高', ''],
        great: ['数据集场景丰富度较高', ''],
        notBad: ['数据集场景丰富度一般', '建议适当增加更多不同场景的图片数据'],
        bad: ['数据集场景丰富度较低', '建议增加更多不同场景的图片数据'],
      },
    },
  ],
  [
    AnalyzeItem.ImgDiscrimination,
    {
      name: '场景丰富度',
      description: '图片所覆盖的场景丰富程度',
      explain: '图片间特征的差异度越大，该指标数值越大，数据集的场景丰富度越高。',
      suggestion: {
        excellent: ['数据集场景丰富度较高', ''],
        great: ['数据集场景丰富度较高', ''],
        notBad: ['数据集场景丰富度一般', '建议适当增加更多不同场景的图片数据'],
        bad: ['数据集场景丰富度较低', '建议增加更多不同场景的图片数据'],
      },
    },
  ],
  [
    AnalyzeItem.FineGrain,
    {
      name: '细粒度',
      description: '数据集各类间的区分度',
      explain: '该指标数值越大，代表数据集的细粒度越低，类别间的区分度越大。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加样本每个类别的数量，以挖掘更多细粒度特征'],
        bad: ['数据集类间区分度较小', '建议增加样本每个类别的数量，以挖掘更多细粒度特征'],
      },
    },
  ],
  [
    AnalyzeItem.LongTail,
    {
      name: '类别均衡度',
      description: '数据集各分类的数据量均衡度',
      explain: '类别间样本数差异度越小，该指标数值越大，数据集的类别均衡度越高，质量越优',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加小样本类别的数据量'],
        bad: ['数据集类别差异较大', '建议增加小样本类别的数据量'],
      },
    },
  ],
  [
    AnalyzeItem.FewShot,
    {
      name: '小样本分布',
      description: '数据集各类别的样本总量',
      explain: '小样本类的存在会使得预测结果存在一定偏差，小样本类占比越小，该指标数值越大。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集存在小样本类', '预测结果可能存在一定偏差'],
        notBad: ['数据集小样本类较多', '可能会影响最终的预测结果，建议适当增加小样本类别'],
        bad: ['数据集小样本类较多', '可能会影响最终的预测结果，建议增加小样本类别的数据量'],
      },
    },
  ],
  [
    AnalyzeItem.Underexposed,
    {
      name: '光照质量',
      description: '图片曝光均衡度',
      explain: '欠曝型图片数占数据总数的比值越小，该指标数值越大，数据集的光照质量越高，质量越优。',
      suggestion: {
        excellent: ['数据表现较优', ''],
        great: ['数据表现较优', ''],
        notBad: ['数据表现良好', '建议适当增强数据集图片亮度'],
        bad: ['数据光照质量较差', '建议大幅增强数据集图片亮度'],
      },
    },
  ],
  [
    AnalyzeItem.SmallDetect,
    {
      name: '目标尺寸',
      description: '图片中检测的目标尺寸大小',
      explain: '小目标型图片数占数据总数的比值越小，该指标数值越大。',
      suggestion: {
        excellent: ['', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加目标尺寸较大的图片'],
        bad: ['当前存在较多小目标图片', '建议增加更多目标尺寸较大的图片'],
      },
    },
  ],
  [
    AnalyzeItem.Intensive,
    {
      name: '目标分散度',
      description: '图片中检测的目标在同张图中的分散程度',
      explain: '目标密集型图片数占数据总数的比值越小，该指标数值越大，数据集的目标分散度越高，质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加目标间间隔较大的图片，以更好地提取各目标的特征'],
        bad: ['数据集目标分散度较低', '建议增加更多目标间间隔较大的图片，以更好地提取各目标的特征'],
      },
    },
  ],
  [
    AnalyzeItem.Occlusion,
    {
      name: '目标完整度',
      description: '图片中检测目标重叠程度',
      explain: '目标重叠度低的图片数占数据总数的比值越大，该指标数值越大，数据集的目标完整度越高，质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加目标重叠度低的图片，以更好地提取目标特征'],
        bad: ['数据集目标完整度较低', '建议增加更多目标重叠度低的图片，以更好地提取目标特征'],
      },
    },
  ],
  [
    AnalyzeItem.MultiScale,
    {
      name: '尺寸均衡度',
      description: '图片中检测的目标尺寸大小均衡程度',
      explain: '图片中同类别的目标间尺寸差异小的图片数占数据总数的比值越大，该指标数值越大，数据集的尺寸均衡度越高。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加目标尺寸较均衡的图片，减小类别内目标之间的尺寸差异'],
        bad: ['数据集目标尺寸差异较大', '建议增加更多目标尺寸较均衡的图片，减小类别内目标之间的尺寸差异'],
      },
    },
  ],
])

export const imgMapping: Map<AnalyzeItem, AnalyzeImage> = new Map([
  [
    AnalyzeItem.ImageSize,
    {
      input: size0,
      inputTip: '图片尺寸大',
      output: size1,
      outputTip: '图片尺寸小',
    }
  ],
  [
    AnalyzeItem.FineSize,
    {
      input: size0,
      inputTip: '图片尺寸大',
      output: size1,
      outputTip: '图片尺寸小',
    }
  ],
  [
    AnalyzeItem.SceneDiversity,
    {
      input: scene0,
      inputTip: '场景丰富度高',
      output: scene1,
      outputTip: '场景丰富度低',
    }
  ],
  [
    AnalyzeItem.ImgDiscrimination,
    {
      input: scene0,
      inputTip: '场景丰富度高',
      output: scene1,
      outputTip: '场景丰富度低',
    }
  ],
  [
    AnalyzeItem.FineGrain,
    {
      input: fine0,
      inputTip: '细粒度低',
      output: fine1,
      outputTip: '细粒度高',
    }
  ],
  [
    AnalyzeItem.LongTail,
    {
      input: longTail0,
      inputTip: '类别数据均衡',
      output: longTail1,
      outputTip: '类别数据差异大',
    }
  ],
  [
    AnalyzeItem.FewShot,
    {
      input: fewShot0,
      inputTip: '小样本占比小',
      output: fewShot1,
      outputTip: '小样本占比大',
    }
  ],
  [
    AnalyzeItem.Underexposed,
    {
      input: underexposed0,
      inputTip: '光照质量高',
      output: underexposed1,
      outputTip: '光照质量低',
    }
  ],
  [
    AnalyzeItem.SmallDetect,
    {
      input: smallDetect0,
      inputTip: '目标尺寸大',
      output: smallDetect1,
      outputTip: '目标尺寸小',
    }
  ],
  [
    AnalyzeItem.Intensive,
    {
      input: intensive0,
      inputTip: '目标分布密度低',
      output: intensive1,
      outputTip: '目标分布密度高',
    }
  ],
  [
    AnalyzeItem.Occlusion,
    {
      input: occlusion0,
      inputTip: '目标完整',
      output: occlusion1,
      outputTip: '目标不完整',
    }
  ],
  [
    AnalyzeItem.MultiScale,
    {
      input: multiScale0,
      inputTip: '目标尺寸差异小',
      output: multiScale1,
      outputTip: '目标尺寸差异大',
    }
  ],
])

export const sceneNameMapping: Map<DatasetScene, string> = new Map([
  [DatasetScene.Detection, '检测'],
  [DatasetScene.Classify, '分类'],
  [DatasetScene.CityscapesSegment, '通用分割'],
  [DatasetScene.PortraitSegment, '肖像分割'],
  [DatasetScene.Monocular3DDetection, '3D 检测'],
  [DatasetScene.PoseDetection, '姿态检测'],
  [DatasetScene.CarPoseDetection, '车辆姿态检测'],
])
