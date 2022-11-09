
import { AnalyzeData, AnalyzeItem } from '@views/DataSet/DatasetAnalysis/type'
import { imgMapping, tipMapping } from '@views/DataSet/DatasetAnalysis/mapping'

export const processEchartsData = (assessResult: Record<AnalyzeItem, number>): Array<AnalyzeData> => {
  return Object.entries(assessResult).map(([item, source]) => ({
    sign: item as AnalyzeItem,
    score: source,
    tip: tipMapping.get(item as AnalyzeItem) || undefined,
    img: imgMapping.get(item as AnalyzeItem) || undefined,
  }))
}
