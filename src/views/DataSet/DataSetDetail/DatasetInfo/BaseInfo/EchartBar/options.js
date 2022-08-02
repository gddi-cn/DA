
import * as echarts from 'echarts'

export const getOptions = (items) => {
  const dataAxis = items.map((o, i) => {
    return o.name
  });
  const data = items.map((o, i) => {
    return o.annotation_count
  });
  const yMax = 500;
  const dataShadow = [];

  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  const option = {
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
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        },
        show: false
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

        barMaxWidth: 17,
        barGap: '30%',
        showBackground: true,
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
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  return option
}
