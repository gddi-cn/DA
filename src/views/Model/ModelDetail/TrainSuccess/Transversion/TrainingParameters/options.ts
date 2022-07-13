
const trainChartsArr = ['模型结构软适应', '模型结构硬适应', '知识迁移软适应', '知识迁移硬适应']
export const getOptions = (v: any, xData: any) => {
  const key = Object.keys(xData)[0]
  // console.log(v, xData)
  // const data = xData[key]
  // if (!data) {
  //   return {}
  // }
  // const arr = []
  // const yarr = []
  // const targetPercent = data.length * 0.01
  // for (let i = 0; i < data.length; i++) {
  //   const index = Math.floor(targetPercent * i)
  //   if (index < data.length) {
  //     arr.push(data[index])
  //     yarr.push(v[index])
  //   } else {
  //     break
  //   }
  // }
  const option = {
    color: ['#3D7FFF', '#52CCA3', '#9580FF', '#BFB3FF'],

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: v && v.map ? v.map((o: any, i: any) => {
        return i <= 3 ? trainChartsArr[i] : '知识增强' + (i + 1)
      }) : [],
      bottom: '4%',
      right: '10%',
      icon: 'circle',
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,

      data: xData[key]
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },

    series: v && v.map ? v.map((o: any) => {
      return {
        // name: i <= 3 ? trainChartsArr[i] : '知识增强' + (i + 1),
        type: 'line',
        smooth: true,
        showSymbol: false,
        hoverAnimation: false,
        data: o,

      }
    }) : []

  };

  return option
}
