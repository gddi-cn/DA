import { imgObj, chineseObj, colorObj } from './config'

export function processEchartsData (data: any): any {
  const handleSwitchImg = (val: any) => {
    return val.map((item: any) => {
      return imgObj[item]
    })
  }

  const handleSwitchName = (val: any) => {
    return val.map((item: any) => {
      return chineseObj[item]
    })
  }

  const handleSwitchColor = (val: any) => {
    return val.map((item: any) => {
      return colorObj[item]
    })
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
  const labeldata = handleSwitchName(Object.keys(data))
  const img = handleSwitchImg(Object.keys(data))
  const color = handleSwitchColor(Object.keys(data))
  const value = Object.values(data)
  dataList = value.map((o: any, i: number) => {
    return {
      sign: i,
      value: keepTwoDecimal(o),
      label: labeldata[i],
      img: img[i],
      color: color[i]
    }
  })

  return {

    dataList,
  }
}
