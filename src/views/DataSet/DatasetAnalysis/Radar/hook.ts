import React from 'react'
import { EChartsType, init as initChart } from 'echarts'
import { getOptions } from './getOptions'
import { AnalyzeData  } from '@src/shared/types/dataset'
import { nameItemMapping } from '@src/shared/mapping/dataset'
import { AnalyzeItem } from '@src/shared/enum/dataset'
import { RadarProps } from '@views/DataSet/DatasetAnalysis/Radar/Radar'

const useInitChart = (
  chartRef: React.MutableRefObject<EChartsType | null>,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [init, setInit] = React.useState<boolean>(false)

  React.useEffect(
    () => {
      if (!containerRef.current) return
      if (init) return

      chartRef.current = initChart(containerRef.current)

      setInit(true)
    },
    [init]
  )

  return init
}

const useMouseEvent = (
  chartRef: React.MutableRefObject<EChartsType | null>,
  init: boolean,
  dataList: Array<AnalyzeData>,
  onSignChange?: (sign?: AnalyzeItem) => void,
) => {
  React.useEffect(
    () => {
      if (!init) return
      if (!chartRef.current) return

      chartRef.current.on('click', (params: any) => {
        if (params?.componentType !== 'radar') return
        if (!params.name) return

        let sign: AnalyzeItem | undefined;

        nameItemMapping.forEach(({ name, item }) => {
          if (params.name.includes(name) && dataList.some(x => x.sign === item)) {
            sign = item
          }
        })

        onSignChange && onSignChange(sign)
      })
    },
    [init, dataList]
  )
}

const useOptions = (
  chartRef: React.MutableRefObject<EChartsType | null>,
  dataList: Array<AnalyzeData>,
  init: boolean,
  onItemChange?: (item?: AnalyzeItem) => void,
) => {
  const [currentSign, setCurrentSign] = React.useState<AnalyzeItem | undefined>(undefined)

  useMouseEvent(chartRef, init, dataList, setCurrentSign)

  React.useEffect(
    () => {
      onItemChange && onItemChange(currentSign)
    },
    [currentSign]
  )

  React.useEffect(
    () => {
      if (!dataList.length) return setCurrentSign(undefined)
      setCurrentSign(dataList[0].sign)
    },
    [dataList]
  )

  React.useEffect(
    () => {
      if (!init) return
      if (!chartRef.current) return
      // 弱智 ECharts 空数组都 throw error
      if (!dataList.length) return

      chartRef.current?.setOption(getOptions(dataList, currentSign))
    },
    [init, dataList, currentSign]
  )
}

const useResize = (chartRef: React.MutableRefObject<EChartsType | null>) => {
  React.useEffect(
    () => {
      const handleResize = () => {
        chartRef.current?.resize()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    []
  )
}

export const useRadar: (props: RadarProps) => any = (
  {
    dataList = [],
    onItemChange,
  }
) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const chartRef = React.useRef<EChartsType | null>(null)

  const init = useInitChart(chartRef, containerRef)
  useOptions(chartRef, dataList, init, onItemChange)
  useResize(chartRef)

  return {
    containerRef,
    displayData: {}
  }
}
