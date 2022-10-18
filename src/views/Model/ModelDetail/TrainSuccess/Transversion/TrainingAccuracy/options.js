
// import * as echarts from 'echarts'
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
      data: ['准确率', '召回率'],
      show: false
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#061926',
      borderWidth: 0,
      borderRadius: 10,
      textStyle: {
        color: '#fff'
      },
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
    grid: {
      left: '0%',
      right: '0%',
      bottom: '8%',
      containLabel: true
    },
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
          color: '#A3D0EF',
          borderRadius: [10, 10, 0, 0],
          borderWidth: 1,
          borderType: 'solid'
        },

        data: dataAcc
      },
      {
        type: 'bar',
        name: '召回率',
        barMaxWidth: 17,
        barGap: '30%',

        itemStyle: {
          color: '#5AABE2',
          borderRadius: [10, 10, 0, 0],
          borderWidth: 1,
          borderType: 'solid'
        },

        data: dataRec
      }
    ]
  };
  return option
}
