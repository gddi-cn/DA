import { AnalyzeItem, DatasetScene } from '@src/shared/enum/dataset'
import { imgMapping, tipMapping } from '@src/shared/mapping/dataset'
import { AnalyzeData } from '@src/shared/types/dataset'

const getSign = (sign: AnalyzeItem, scene?: DatasetScene) => {
  if (scene === DatasetScene.KeyPointsBasedAction) {
    switch (sign) {
      case AnalyzeItem.RAW_AREA:
        return AnalyzeItem.AREA
      case AnalyzeItem.RAW_ACTION_DURATION:
        return AnalyzeItem.ACTION_DURATION
      case AnalyzeItem.RAW_DISTINCTION_DEGREE:
        return AnalyzeItem.DISTINCTION_DEGREE
      case AnalyzeItem.RAW_KEY_POINTS_VISIBILITY:
        return AnalyzeItem.KEY_POINTS_VISIBILITY
      case AnalyzeItem.RAW_LONG_TAIL_ACTION:
        return AnalyzeItem.LONG_TAIL_ACTION
      default:
        return sign
    }
  }
  return sign
}

export const processEchartsData = (assessResult: Record<AnalyzeItem, number>, scene?: DatasetScene): Array<AnalyzeData> =>
  Object.entries(assessResult).map(([item, source]) => {
    const sign = getSign(item as AnalyzeItem, scene)
    return {
      sign,
      score: source,
      tip: tipMapping.get(sign) || undefined,
      img: imgMapping.get(sign) || undefined,
    }
  })
