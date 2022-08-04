import { isNil, isEmpty } from 'lodash'

const getPrecisionSteps = (precisionSteps:any, key:number, index:any) => {
  console.log(key, 'precisionSteps')
  console.log(precisionSteps[key], 'precisionSteps')
  try {
    if (isNil(precisionSteps) || isEmpty(precisionSteps)) {
      return '-'
    }
    return precisionSteps[key][index]
  } catch (e) {
    console.error(e)
    return '-'
  }
}
export const getTableData = (data: any, filer:any) => {
  console.log(filer, 'filer')
  if (isNil(data) || isEmpty(data)) {
    return []
  }

  const { config_type, thres_s, dataset_version, version_m = [], version_s, thres_m = [] } = filer
  // getPrecisionSteps(precisionSteps, threshold, 2)
  let version_of_dataset :any = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i].dataset_id === dataset_version) {
      version_of_dataset = data[i]
    }
  }
  console.log(version_of_dataset, 'version_of_dataset')
  console.log(filer, 'filer')
  if (isEmpty(version_of_dataset)) {
    return []
  }

  const listByFilter:any[] = []

  const { versions } = version_of_dataset

  if (config_type === 'version') {
    // version_m ,thres_s
    for (let i = 0; i < versions.length; i++) {
      const { tag } = versions[i]
      if (isEmpty(version_m)) {
        const { precision_steps } = versions[i]
        listByFilter.push({
          tag,
          threshold: thres_s,
          fScore: getPrecisionSteps(precision_steps, thres_s, 2),
          recall: getPrecisionSteps(precision_steps, thres_s, 1),
          accuracy: getPrecisionSteps(precision_steps, thres_s, 0),
          dataset_name: version_of_dataset.name
        })
      } else {}
      if ((version_m as Array<any>).includes(tag)) {
        const { precision_steps } = versions[i]
        listByFilter.push({
          tag,
          threshold: thres_s,
          fScore: getPrecisionSteps(precision_steps, thres_s, 2),
          recall: getPrecisionSteps(precision_steps, thres_s, 1),
          accuracy: getPrecisionSteps(precision_steps, thres_s, 0),
          dataset_name: version_of_dataset.name
        })
      }
    }
  } else {
    // version_s thres_m
    for (let i = 0; i < versions.length; i++) {
      const { tag } = versions[i]
      if (version_s === tag) {
        const { precision_steps } = versions[i]
        if (isEmpty(thres_m)) {
          for (let _i = 1; _i <= 100; _i++) {
            listByFilter.push({
              tag,
              threshold: _i,
              fScore: getPrecisionSteps(precision_steps, _i, 2),
              recall: getPrecisionSteps(precision_steps, _i, 1),
              accuracy: getPrecisionSteps(precision_steps, _i, 0),
              dataset_name: version_of_dataset.name
            })
          }
        } else {
          for (let _i = 0; _i < thres_m.length; _i++) {
            const thres = thres_m[_i]
            listByFilter.push({
              tag,
              threshold: thres,
              fScore: getPrecisionSteps(precision_steps, thres, 2),
              recall: getPrecisionSteps(precision_steps, thres, 1),
              accuracy: getPrecisionSteps(precision_steps, thres, 0),
              dataset_name: version_of_dataset.name
            })
          }
        }
      }
    }
  }

  return listByFilter
}

export const update = (data:any, value:any, unique:any) => {
  console.log(value, 'valuevaluevaluevaluevaluevaluevaluevaluevaluevaluevalue')
  return data.map((o:any) => {
    const { key, tag, precisionSteps } = o
    if (key === unique) {
      return {
        tag,
        threshold: value,
        fScore: getPrecisionSteps(precisionSteps, value, 2),
        recall: getPrecisionSteps(precisionSteps, value, 1),
        accuracy: getPrecisionSteps(precisionSteps, value, 0),
        key,
        precisionSteps
      }
    } else {
      return o
    }
  })
}

export const getThresOptions = (data: any) => {
  if (isEmpty(data)) {
    return {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#65ABE7',
          fontWeight: 'normal',
          fontSize: 16
        }
      }
    }
  }

  const accuracyArr = data.map((o: any) => o.accuracy)
  const recallArr = data.map((o: any) => o.recall)
  const fScoreArr = data.map((o: any) => o.fScore || o.f_score)

  const dataAxis = data.map((o: any) => o.threshold)

  const option = {

    legend: {
      data: ['精确率', '召回率', 'F1 Score']
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
      z: 10,
      type: 'value',
    },

    yAxis: {
      data: dataAxis,
      type: 'category',
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
      {

        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 13,
        height: '80%',
        showDataShadow: false,
        left: '93%'
      }
    ],
    series: [
      {
        type: 'bar',
        name: '精确率',
        barMaxWidth: 17,
        barGap: '30%',
        data: accuracyArr,
        itemStyle: {
          color: '#2EC16B'
        },
      },
      {
        type: 'bar',
        name: '召回率',
        barMaxWidth: 17,
        barGap: '30%',
        itemStyle: {
          color: '#FF6584'
        },
        data: recallArr
      },
      {
        type: 'bar',
        name: 'F1 Score',
        barMaxWidth: 17,
        barGap: '30%',
        itemStyle: {
          color: '#48A2DF'
        },
        data: fScoreArr
      }
    ]
  };
  return option
}

export const getOptions = (data:any) => {
  console.log(data, 'dataList')
  if (isEmpty(data)) {
    return {
      title: {
        text: '暂无数据',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#65ABE7',
          fontWeight: 'normal',
          fontSize: 16
        }
      }
    }
  }

  const accuracyArr = data.map((o:any) => o.accuracy)
  const recallArr = data.map((o:any) => o.recall)
  const fScoreArr = data.map((o:any) => o.fScore || o.f_score)

  const dataAxis = data.map((o:any) => o.tag)

  const option = {

    legend: {
      data: ['精确率', '召回率', 'F1 Score']
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
      z: 10,
      type: 'value',
    },

    yAxis: {
      data: dataAxis,
      type: 'category',
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
      {

        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 13,
        height: '80%',
        showDataShadow: false,
        left: '93%'
      }
    ],
    series: [
      {
        type: 'bar',
        name: '精确率',
        barMaxWidth: 17,
        barGap: '30%',
        data: accuracyArr,
        itemStyle: {
          color: '#2EC16B'
        },
      },
      {
        type: 'bar',
        name: '召回率',
        barMaxWidth: 17,
        barGap: '30%',
        itemStyle: {
          color: '#FF6584'
        },
        data: recallArr
      },
      {
        type: 'bar',
        name: 'F1 Score',
        barMaxWidth: 17,
        barGap: '30%',
        itemStyle: {
          color: '#48A2DF'
        },
        data: fScoreArr
      }
    ]
  };
  return option
}
