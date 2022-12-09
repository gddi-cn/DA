import {
  ModelFalseAnalysis,
  ModelFalseAnalysisItem,
  SegmentFalseAnalysis, SegmentFalseItem
} from '@src/shared/types/model'
import { ModelFalseItem, ModelFalseType } from '@src/shared/enum/model'
import { modelFalseItemNameMapping } from '@src/shared/mapping/model'
import { DatasetScene } from '@src/shared/enum/dataset'
import { isEmpty } from 'lodash'

const formatCityscapesSegmentData = (rawData?: SegmentFalseItem): Array<Album.ImgMeta> => {
  if (!rawData) return []

  return Object
    .entries(rawData)
    .map(([rawSrc, src]) => ({
      rawSrc, src
    }))
}

const formatCityscapesSegment = (
  falseAnalysis: SegmentFalseAnalysis,
  scene: ModelFalseType
): Array<ModelFalseAnalysisItem> =>
{
  if (scene === ModelFalseType.SCENE) {
    if (isEmpty(falseAnalysis.scene_false))
      return []

    return Object
      .entries(falseAnalysis.scene_false)
      .map(([analysisItem, value], idx) => ({
        uid: `${scene}_${analysisItem}_${idx}`,
        score: value.score,
        sceneTip: {
          label: modelFalseItemNameMapping.get(analysisItem as ModelFalseItem) || analysisItem,
          advice: value.advice,
        },
        labelTip: {
          correctLabel: '',
          wrongLabel: '',
          wrongNum: 0
        },
        dataList: formatCityscapesSegmentData(value.results),
      }))
  }

  if (isEmpty(falseAnalysis.confusion_matrix))
    return []

  return Object.entries(falseAnalysis.confusion_matrix)
    .map(([correctLabel, value], idx) => {
      const [{ wrongLabel, wrongNum, data }] = isEmpty(value) ? [{ wrongLabel: '', wrongNum: 0, data: undefined }]
        : Object
          .entries(value)
          .map(([wrongLabel, res]) => ({
            wrongLabel,  wrongNum: res.cnt, data: res.results
          }))

      return {
        uid: `${scene}_${correctLabel}_${wrongLabel}_${idx}`,
        score: 100 - wrongNum,
        sceneTip: {
          label: '',
          advice: '',
        },
        labelTip: {
          correctLabel,
          wrongLabel,
          wrongNum,
        },
        dataList: formatCityscapesSegmentData(data),
      }
    })
}

export const formatFalseAnalysis = (
  scene: DatasetScene,
  falseAnalysis: ModelFalseAnalysis,
  falseType: ModelFalseType
): Array<ModelFalseAnalysisItem> => {
  switch(scene) {
    case DatasetScene.Detection:
      break
    case DatasetScene.Classify:
      break
    case DatasetScene.CarPoseDetection:
      break
    case DatasetScene.CityscapesSegment:
      return formatCityscapesSegment(falseAnalysis as SegmentFalseAnalysis, falseType)
    case DatasetScene.PoseDetection:
      break
    default:
      return []
  }

  return []
}
