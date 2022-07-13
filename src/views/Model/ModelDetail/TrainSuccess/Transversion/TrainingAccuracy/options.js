
import * as echarts from 'echarts'
import { isEmpty } from 'lodash'

export const getOptions = (items) => {
  const obj = {}
  if (!isEmpty(items)) {
    for (const o of items) {
      const { label, acc, rec } = o
      obj[label] = {
        acc, rec
      }
    }
  }

  console.warn(obj, 'objobjobj')

  const dataAxis = []
  const dataAcc = []
  const dataRec = []

  for (const [k, v] of Object.entries(obj)) {
    dataAxis.push(k)
    dataAcc.push(v.acc)
    dataRec.push(v.rec)
  }

  const option = {
    legend: {
      data: ['准确率', '召回率']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        // inside: true,
        textStyle: {
          color: '#999999'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        },
        show: true
      }
    },
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    dataZoom: [
      {
        show: true,

        height: 13,
        showDataShadow: true,
      },
      {
        type: 'inside',

      },
      //   {

    //     show: true,
    //     yAxisIndex: 0,
    //     filterMode: 'empty',
    //     width: 13,
    //     height: '80%',
    //     showDataShadow: false,
    //     left: '93%'
    //   }
    ],
    series: [
      {
        type: 'bar',
        name: '准确率',
        barMaxWidth: 17,
        barGap: '30%',

        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#6699FF' }
            ]
          )
        },

        data: dataAcc
      },
      {
        type: 'bar',
        name: '召回率',
        barMaxWidth: 17,
        barGap: '30%',

        itemStyle: {
          color: '#999'
        },

        data: dataRec
      }
    ]
  };
  return option
}
