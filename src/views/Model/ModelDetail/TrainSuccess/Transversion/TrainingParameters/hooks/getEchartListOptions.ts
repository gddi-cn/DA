import { isNil } from 'lodash'
export const getEchartListOptions = (dataList: any, optipnsObj: any, optipnsTestObj: any): any => {
  for (const data of dataList) {
    const { type, x_axis_data: xData, y_axis_data: yData, processid } = data
    const myprocessid = Number(processid) - 1

    if (type === 'train') {
      for (const [xk, xv] of Object.entries(xData)) {
        if (isNil(optipnsObj.xData[xk])) {
          optipnsObj.xData[xk] = []
          optipnsObj.xData[xk].push(xv)
        } else {
          optipnsObj.xData[xk].push(xv)
        }

        optipnsObj.xData[xk] = [...new Set(optipnsObj.xData[xk])]
      }

      for (const [yk, yv] of Object.entries(yData)) {
        if (isNil(optipnsObj.yData[yk])) {
          optipnsObj.yData[yk] = []
          if (isNil(optipnsObj.yData[yk][myprocessid])) {
            optipnsObj.yData[yk][myprocessid] = []
          }
          optipnsObj.yData[yk][myprocessid].push(yv)
        } else {
          if (isNil(optipnsObj.yData[yk][myprocessid])) {
            optipnsObj.yData[yk][myprocessid] = []
          }
          optipnsObj.yData[yk][myprocessid].push(yv)
        }
      }

      // console.log(optipnsObj)
    } else {
      for (const [xk, xv] of Object.entries(xData)) {
        if (isNil(optipnsTestObj.xData[xk])) {
          optipnsTestObj.xData[xk] = []
          optipnsTestObj.xData[xk].push(xv)
        } else {
          optipnsTestObj.xData[xk].push(xv)
        }
        optipnsTestObj.xData[xk] = [...new Set(optipnsTestObj.xData[xk])]
      }

      for (const [yk, yv] of Object.entries(yData)) {
        if (isNil(optipnsTestObj.yData[yk])) {
          optipnsTestObj.yData[yk] = []
          if (isNil(optipnsTestObj.yData[yk][myprocessid])) {
            optipnsTestObj.yData[yk][myprocessid] = []
          }
          optipnsTestObj.yData[yk][myprocessid].push(yv)
        } else {
          if (isNil(optipnsTestObj.yData[yk][myprocessid])) {
            optipnsTestObj.yData[yk][myprocessid] = []
          }
          optipnsTestObj.yData[yk][myprocessid].push(yv)
        }
      }
    }
  }

  return [{ ...optipnsObj }, { ...optipnsTestObj }]
}

export const newGetEchartListOptions = (dataList: any): any => {
  const optipnsObj: any = {
    xData: {},
    yData: {}
  }
  const optipnsTestObj: any = {
    xData: {},
    yData: {}
  }
  for (const data of dataList) {
    const { type, x_axis_data: xData, y_axis_data: yData, processid } = data
    const myprocessid = Number(processid) - 1

    if (type === 'train') {
      for (const [xk, xv] of Object.entries(xData)) {
        if (isNil(optipnsObj.xData[xk])) {
          optipnsObj.xData[xk] = []
          optipnsObj.xData[xk].push(xv)
        } else {
          optipnsObj.xData[xk].push(xv)
        }

        optipnsObj.xData[xk] = [...new Set(optipnsObj.xData[xk])]
      }

      for (const [yk, yv] of Object.entries(yData)) {
        if (isNil(optipnsObj.yData[yk])) {
          optipnsObj.yData[yk] = []
          if (isNil(optipnsObj.yData[yk][myprocessid])) {
            optipnsObj.yData[yk][myprocessid] = []
          }
          optipnsObj.yData[yk][myprocessid].push(yv)
        } else {
          if (isNil(optipnsObj.yData[yk][myprocessid])) {
            optipnsObj.yData[yk][myprocessid] = []
          }
          optipnsObj.yData[yk][myprocessid].push(yv)
        }
      }

      // console.log(optipnsObj)
    } else {
      for (const [xk, xv] of Object.entries(xData)) {
        if (isNil(optipnsTestObj.xData[xk])) {
          optipnsTestObj.xData[xk] = []
          optipnsTestObj.xData[xk].push(xv)
        } else {
          optipnsTestObj.xData[xk].push(xv)
        }
        optipnsTestObj.xData[xk] = [...new Set(optipnsTestObj.xData[xk])]
      }

      for (const [yk, yv] of Object.entries(yData)) {
        if (isNil(optipnsTestObj.yData[yk])) {
          optipnsTestObj.yData[yk] = []
          if (isNil(optipnsTestObj.yData[yk][myprocessid])) {
            optipnsTestObj.yData[yk][myprocessid] = []
          }
          optipnsTestObj.yData[yk][myprocessid].push(yv)
        } else {
          if (isNil(optipnsTestObj.yData[yk][myprocessid])) {
            optipnsTestObj.yData[yk][myprocessid] = []
          }
          optipnsTestObj.yData[yk][myprocessid].push(yv)
        }
      }
    }
  }

  return [{ ...optipnsObj }, { ...optipnsTestObj }]
}
