
import { isEmpty } from 'lodash'
import { chineseObj, colorObj } from '@src/constants/analysis_types'

export function processEchartsData (data: any): any {
  let dataList: any[] = []
  if (isEmpty(data)) {
    return dataList
  }

  const handleSwitchName = (val: any) => {
    return val.map((item: any) => {
      return (chineseObj as any)[item]
    })
  }

  const handleSwitchColor = (val: any) => {
    return val.map((item: any) => {
      return (colorObj as any)[item]
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

  //   let dataList: any = []
  const labeldata = handleSwitchName(Object.keys(data))

  const color = handleSwitchColor(Object.keys(data))
  const value = Object.values(data)
  dataList = value.map((o: any, i: number) => {
    return {
      sign: i,
      value: (keepTwoDecimal(o?.score) as number * 100).toFixed(0),
      label: <p className='sences_title'>{labeldata[i]}</p>,

      color: color[i],
      data: o
    }
  })

  return dataList.sort((a: any, b: any) => b.value - a.value)
}
