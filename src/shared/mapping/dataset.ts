import { AnalyzeItem, DatasetCreateType, DatasetDownloadStatus, DatasetImportStatus, DatasetScene } from '@src/shared/enum/dataset'
import { AnalyzeImage, DataAnalyzeTip } from '@src/shared/types/dataset'
import fewShot0 from '@views/DataSet/DatasetAnalysis/analysisImg/few_shot_0.png'
import fewShot1 from '@views/DataSet/DatasetAnalysis/analysisImg/few_shot_1.png'
import fine0 from '@views/DataSet/DatasetAnalysis/analysisImg/fine_0.png'
import fine1 from '@views/DataSet/DatasetAnalysis/analysisImg/fine_1.png'
import intensive0 from '@views/DataSet/DatasetAnalysis/analysisImg/intensive_0.png'
import intensive1 from '@views/DataSet/DatasetAnalysis/analysisImg/intensive_1.png'
import longTail0 from '@views/DataSet/DatasetAnalysis/analysisImg/long_tail_0.png'
import longTail1 from '@views/DataSet/DatasetAnalysis/analysisImg/long_tail_1.png'
import multiScale0 from '@views/DataSet/DatasetAnalysis/analysisImg/multi_scale_0.png'
import multiScale1 from '@views/DataSet/DatasetAnalysis/analysisImg/multi_scale_1.png'
import occlusion0 from '@views/DataSet/DatasetAnalysis/analysisImg/occlusion_0.png'
import occlusion1 from '@views/DataSet/DatasetAnalysis/analysisImg/occlusion_1.png'
import scene0 from '@views/DataSet/DatasetAnalysis/analysisImg/scene_0.png'
import scene1 from '@views/DataSet/DatasetAnalysis/analysisImg/scene_1.png'
import size0 from '@views/DataSet/DatasetAnalysis/analysisImg/size_0.png'
import size1 from '@views/DataSet/DatasetAnalysis/analysisImg/size_1.png'
import smallDetect0 from '@views/DataSet/DatasetAnalysis/analysisImg/small_detect_0.png'
import smallDetect1 from '@views/DataSet/DatasetAnalysis/analysisImg/small_detect_1.png'
import underexposed0 from '@views/DataSet/DatasetAnalysis/analysisImg/underexposed_0.png'
import underexposed1 from '@views/DataSet/DatasetAnalysis/analysisImg/underexposed_1.png'
import area0 from '@views/DataSet/DatasetAnalysis/analysisImg/area0.png'
import area1 from '@views/DataSet/DatasetAnalysis/analysisImg/area1.png'
import duration0 from '@views/DataSet/DatasetAnalysis/analysisImg/duration0.gif'
import duration1 from '@views/DataSet/DatasetAnalysis/analysisImg/duration1.gif'
import distinction0 from '@views/DataSet/DatasetAnalysis/analysisImg/distinction0.gif'
import distinction1 from '@views/DataSet/DatasetAnalysis/analysisImg/distinction1.gif'
import keyPoints0 from '@views/DataSet/DatasetAnalysis/analysisImg/key_points0.gif'
import keyPoints1 from '@views/DataSet/DatasetAnalysis/analysisImg/key_points1.gif'

import unremarked from '@src/asset/images/dataset/unremarked.png'
import remarked from '@src/asset/images/dataset/remarked.png'
import thirdParty from '@src/asset/images/dataset/thirdParty.png'

export const datasetDownloadStatusNameMapping: Map<DatasetDownloadStatus, string> = new Map([
  [DatasetDownloadStatus.FAILED, /*      */'重新申请'],
  [DatasetDownloadStatus.SUCCESS, /*     */'下载'],
  [DatasetDownloadStatus.UNKNOWN, /*     */'申请下载'],
  [DatasetDownloadStatus.DOWNLOADING, /* */'处理中']
])



export const nameItemMapping = [
  { name: '图片尺寸', item: AnalyzeItem.ImageSize },
  { name: '图片尺寸', item: AnalyzeItem.FineSize },
  { name: '场景丰富度', item: AnalyzeItem.SceneDiversity },
  { name: '场景丰富度', item: AnalyzeItem.ImgDiscrimination },
  { name: '细粒度', item: AnalyzeItem.FineGrain },
  { name: '类别均衡度', item: AnalyzeItem.LongTail },
  { name: '小样本分布', item: AnalyzeItem.FewShot },
  { name: '光照质量', item: AnalyzeItem.Underexposed },
  { name: '目标尺寸', item: AnalyzeItem.SMALL_DETECT },
  { name: '目标分散度', item: AnalyzeItem.Intensive },
  { name: '目标完整度', item: AnalyzeItem.Occlusion },
  { name: '尺寸均衡度', item: AnalyzeItem.MultiScale },
  { name: '目标尺寸', item: AnalyzeItem.AREA },
  { name: '类别均衡度', item: AnalyzeItem.LONG_TAIL_ACTION },
  { name: '动作持续时间', item: AnalyzeItem.ACTION_DURATION },
  { name: '动作幅度', item: AnalyzeItem.DISTINCTION_DEGREE },
  { name: '关键点遮挡', item: AnalyzeItem.KEY_POINTS_VISIBILITY },
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
        excellent: ['数据集表现较优', ''],
        great: ['数据表现较优', ''],
        notBad: ['数据表现良好', '建议适当增强数据集图片亮度'],
        bad: ['数据光照质量较差', '建议大幅增强数据集图片亮度'],
      },
    },
  ],
  [
    AnalyzeItem.SMALL_DETECT,
    {
      name: '目标尺寸',
      description: '图片中检测的目标尺寸大小',
      explain: '小目标型图片数占数据总数的比值越小，该指标数值越大。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
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
  [
    AnalyzeItem.AREA,
    {
      name: '目标尺寸',
      description: '数据集检测到的人体或人体部位大小',
      explain: '检测目标（人体或人体部位）在画面中过小时为小目标，小目标占总数据的比值越小，该指标数值越大，数据集的质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议增加数据，让目标尽量清晰位于屏幕中间'],
        bad: ['数据集表现较差', '建议增加数据，让目标尽量清晰位于屏幕中间'],
      },
    },
  ],
  [
    AnalyzeItem.LONG_TAIL_ACTION,
    {
      name: '类别均衡度',
      description: '数据集各类别数据量均衡度',
      explain: '每类动作类别间样本数差异度越小，该指标数值越大，数据集的类别均衡度越高，质量越优。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议适当增加小样本类别的数据量'],
        bad: ['数据集类别差异较大', '建议增加小样本类别的数据量'],
      },
    },
  ],
  [
    AnalyzeItem.ACTION_DURATION,
    {
      name: '动作持续时间',
      description: '动作持续时间均值',
      explain: '单类动作持续时间超过一定值，即复杂动作，复杂动作数量占数据总数的比值越小，该指标越大。动作拆分得越细，' +
        '越容易被识别，比如“波比跳”可以拆分为“蹲下”、“平板撑”、“跳跃”三个类别。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['存在一定量的复杂动作', '建议优化数据，尽量将单个完整动作拆分为多个动作类别'],
        bad: ['复杂动作较多', '建议优化数据，尽量将单个完整动作拆分为多个动作类别'],
      },
    },
  ],
  [
    AnalyzeItem.DISTINCTION_DEGREE,
    {
      name: '动作幅度',
      description: '动作持续时间内关键点位移幅度',
      explain: '动作幅度越小，算法性能越高，可支持的算法并发数也越大，前端视频可以允许更大的抽帧间隔，' +
        '例如：“站立不动”的幅度较小动作，每 10 帧跑一次动作识别即可，“跑步” 等幅度较大动作，需要5帧跑一次。',
      suggestion: {
        excellent: ['动作幅度合理', '实际落地算法性能较高，可支持的算法并行数较大'],
        great: ['动作幅度合理', ''],
        notBad: ['', ''],
        bad: ['', ''],
        // bad: ['动作幅度合理', '实际落地算法性能较高，可支持的算法并行数较大'],
      },
    },
  ],
  [
    AnalyzeItem.KEY_POINTS_VISIBILITY,
    {
      name: '关键点遮挡',
      description: '动作持续时间内关键点的遮挡情况',
      explain: '计算每类动作在动作持续时间内关键点置信度的均值，判断关键点的遮挡情况，关键点被遮挡的情况越少，该指标数值越大，动作越容易识别。',
      suggestion: {
        excellent: ['数据集表现较优', ''],
        great: ['数据集表现较优', ''],
        notBad: ['数据集表现良好', '建议增加数据，注意调整相机位置，减少被遮挡的情况'],
        bad: ['数据集表现较差', '建议增加数据，注意调整相机位置，减少被遮挡的情况'],
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
    AnalyzeItem.SMALL_DETECT,
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
    },
  ],
  [
    AnalyzeItem.AREA,
    {
      input: area0,
      inputTip: '尺寸适中',
      output: area1,
      outputTip: '尺寸过大或过小',
    },
  ],
  [
    AnalyzeItem.LONG_TAIL_ACTION,
    {
      input: longTail0,
      inputTip: '类别数据均衡',
      output: longTail1,
      outputTip: '类别数据差异大',
    },
  ],
  [
    AnalyzeItem.ACTION_DURATION,
    {
      input: duration0,
      inputTip: '单个标签动作持续时间短',
      output: duration1,
      outputTip: '单个标签动作持续时间长',
    },
  ],
  [
    AnalyzeItem.DISTINCTION_DEGREE,
    {
      input: distinction0,
      inputTip: '动作幅度小',
      output: distinction1,
      outputTip: '动作幅度大',
      inputColor: '#48a2df',
      outputColor: '#48a2df',
    },
  ],
  [
    AnalyzeItem.KEY_POINTS_VISIBILITY,
    {
      input: keyPoints0,
      inputTip: '关键点清晰',
      output: keyPoints1,
      outputTip: '关键点遮挡多',
    },
  ],
])

export const sceneNameMapping: Map<DatasetScene, string> = new Map([
  [DatasetScene.Detection, '检测'],
  [DatasetScene.Classify, '图片分类'],
  [DatasetScene.CityscapesSegment, '通用分割'],
  [DatasetScene.PoseDetection, '姿态检测'],
  [DatasetScene.CarPoseDetection, '单目3D 检测'],
  [DatasetScene.KeyPointsBasedAction, '动作识别'],
  [DatasetScene.KeypointsDetection, '关键点检测'],
  [DatasetScene.ImageRetrieval, '图像检索'],
  [DatasetScene.FaceRecognition, '人脸识别'],
  [DatasetScene.Unknown, '未知'],
])

export const datasetCreateTypeLogoMapping: Map<DatasetCreateType, any> = new Map([
  [DatasetCreateType.UPLOAD_UNREMARKED, unremarked],
  [DatasetCreateType.UPLOAD_REMARKED, remarked],
  [DatasetCreateType.IMPORT_THIRD_PARTY, thirdParty],
])

export const datasetCreateTypeNameMapping: Map<DatasetCreateType, string> = new Map([
  [DatasetCreateType.UPLOAD_UNREMARKED, '数据标注服务'],
  [DatasetCreateType.UPLOAD_REMARKED, '上传已标注数据'],
  [DatasetCreateType.IMPORT_THIRD_PARTY, '第三方导入'],
])

export const datasetImportStatusNameMapping: Map<DatasetImportStatus, string> = new Map([
  [DatasetImportStatus.MERGING, /*        */'合并中'],
  [DatasetImportStatus.COMPRESSING, /*    */'压缩中'],
  [DatasetImportStatus.VERIFYING, /*      */'验证中'],
  [DatasetImportStatus.VERIFY_FAILED, /*  */'验证失败'],
  [DatasetImportStatus.VERIFY_SUCCESS, /* */'已验证'],
  [DatasetImportStatus.IMPORTING, /*      */'导入中'],
  [DatasetImportStatus.IMPORT_FAILED, /*  */'导入失败'],
])
