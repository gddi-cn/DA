
import { imgObj, chineseObj, colorObj } from './config'
export function processEchartsData (data:any):any {
  // console.log(data)
  const assessResult = data

  const handleSwitchImg = (val: any) => {
    return val.map((item:any) => {
      return imgObj[item] || item
    })
  }

  const handleSwitchName = (val: any) => {
    return val.map((item:any) => {
      return chineseObj[item] || item
    })
  }

  const handleSwitchColor = (val: any) => {
    return val.map((item:any) => {
      return colorObj[item] || item
    })
  }

  const assessResultOptions = {
    title: {
      text: '数据评估结果',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      // boundaryGap: [0, 0.01]
      max: function () {
        return 1;
      }
    },
    yAxis: {
      type: 'category',
      data: assessResult ? handleSwitchName(Object.keys(assessResult)) : {}
    },
    series: [
      {

        type: 'bar',
        data: assessResult ? Object.values(assessResult) : null
      }
    ]
  }

  function keepTwoDecimal (num: any) {
    let result = parseFloat(num);
    if (isNaN(result)) {
      return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
  }

  let dataList: any = []
  const labeldata = handleSwitchName(Object.keys(assessResult))
  const img = handleSwitchImg(Object.keys(assessResult))
  const color = handleSwitchColor(Object.keys(assessResult))
  const value = Object.values(assessResult)
  dataList = value.map((o:any, i:number) => {
    return {
      sign: i,
      value: keepTwoDecimal(o),
      label: labeldata[i],
      img: img[i],
      color: color[i]
    }
  })

  return {

    assessResultOptions,
    dataList,
  }
}
