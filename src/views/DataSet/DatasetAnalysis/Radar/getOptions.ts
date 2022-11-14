import { ECBasicOption } from 'echarts/types/dist/shared'
import { tipMapping } from '@views/DataSet/DatasetAnalysis/mapping'
import { AnalyzeData, AnalyzeItem, ScoreClass } from '../type'
import { getColor, getScoreClass } from '@views/DataSet/DatasetAnalysis/utils'

export const getOptions = (
  dataList: Array<AnalyzeData>,
  currentSign: AnalyzeItem | undefined,
): ECBasicOption => {
  const indicator = dataList.map(data => ({
    name: data.sign || '--',
    max: 100,
  }))

  const value = dataList.map(data => (data.score * 100 | 0) / 100)

  return {
    title: {
    },
    radar: {
      shape: 'circle',
      radius: '50%',
      triggerEvent: true,
      indicator,
      axisName: {
        rich: {
          value: {
            fontSize: 16,
            fontWeight: 500,
            width: 100,
            height: 40,
            lineHeight: 40,
            color: '#48A2DF',
            align: 'center',
            backgroundColor: 'transparent',
          },
          bg: {
            fontSize: 16,
            fontWeight: 500,
            width: 100,
            height: 40,
            lineHeight: 40,
            color: '#fff',
            borderRadius: 2,
            backgroundColor: '#48A2DF',
            align: 'center',
            borderWidth: 1,
          }
        },
        formatter: (sign: AnalyzeItem) => {
          const name = tipMapping.get(sign)?.name || '--'

          return currentSign === sign
            ? `{bg|${name}}`
            : `{value|${name}}`
        }
      },
    },
    series: [
      {
        name: 'Dataset Analysis',
        type: 'radar',
        triggerEvent: false,
        areaStyle: {
          color: '#9acdef',
        },
        data: [
          {
            value,
            label: {
              show: true,
              position: 'inside',
              offset: [-15, -5],
              formatter: (params: any) => {
                const { value }: { value: number | undefined } = params || {}

                if (!value) return 0

                const scoreClass = getScoreClass(value)

                return `{${scoreClass}|${value}}`
              },
              rich: {
                [ScoreClass.Excellent]: {
                  color: getColor(ScoreClass.Excellent),
                },
                [ScoreClass.Great]: {
                  color: getColor(ScoreClass.Great),
                },
                [ScoreClass.NotBad]: {
                  color: getColor(ScoreClass.NotBad),
                },
                [ScoreClass.Bad]: {
                  color: getColor(ScoreClass.Bad),
                }
              }
            },
          },
        ]
      }
    ]
  }
}
