import { AnalyzeItem } from '@src/shared/enum/dataset'
import { imgMapping, tipMapping } from '@src/shared/mapping/dataset'
import { AnalyzeData } from '@src/shared/types/dataset'

export const processEchartsData = (assessResult: Record<AnalyzeItem, number>): Array<AnalyzeData> =>
  Object.entries(assessResult).map(([item, source]) => ({
    sign: item as AnalyzeItem,
    score: source,
    tip: tipMapping.get(item as AnalyzeItem) || undefined,
    img: imgMapping.get(item as AnalyzeItem) || undefined,
  }))
