import { isEmpty, isNil } from 'lodash'
import { ModelCompare, ModelCompareVersion, ModelCompareTableData } from '@src/shared/types/model'

const getPrecisionSteps = (precisionSteps: ModelCompareVersion['precision_steps'], key = 0, index: number) => {
  try {
    if (isNil(precisionSteps) || isEmpty(precisionSteps)) {
      return '-'
    }
    let arr = precisionSteps[key]
    if (arr.length < index + 1) return  '-'
    return arr[index]
  } catch (e) {
    console.error(e)
    return '-'
  }
}

// TODO BUG FIX
export const getTableData = (data: ModelCompare[], filer: any): Array<ModelCompareTableData> => {
  if (isNil(data) || isEmpty(data)) {
    return []
  }

  const {
    dataset_version, // 基准选择(版本 id)
    config_type, // 模型对比维度 version || threshold（分类没有阈值）
    version_m = [], // 维度为版本时的版本参数
    thres_s, // 维度为版本时的阈值参数
    version_s, // 维度为阈值时的版本参数
    thres_m = [] // 维度为阈值是的阈值参数
  } = filer

  if (!dataset_version) return []

  let version_of_dataset: ModelCompare | undefined

  data.map(m => m.dataset_id === dataset_version && (version_of_dataset = m))

  if (!version_of_dataset) return []

  const listByFilter: ModelCompareTableData[] = []

  const { versions } = version_of_dataset
  
  if (config_type === 'version') { // 模型对比维度为模型版本
    (versions || []).forEach(({ tag, precision_steps }) => {
      if (isEmpty(version_m) || (version_m as Array<ModelCompareVersion['tag']>).includes(tag)) {
        listByFilter.push({
          tag,
          threshold: thres_s,
          fScore: getPrecisionSteps(precision_steps, thres_s, 2),
          recall: getPrecisionSteps(precision_steps, thres_s, 1),
          accuracy: getPrecisionSteps(precision_steps, thres_s, 0),
          dataset_name: version_of_dataset!.name
        })
      }
    })
  } else { // 模型对比维度为阈值
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

  return {

    legend: {
      data: ['精确率', '召回率', 'F1 Score'], show: false
    },

    tooltip: {
      trigger: 'axis', axisPointer: {
        type: 'cross', label: {
          backgroundColor: '#6a7985'
        }
      }, backgroundColor: '#061926', borderWidth: 0, borderRadius: 10, textStyle: {
        color: '#fff'
      },
    },

    xAxis: {

      axisLabel: {
        // inside: true,
        textStyle: {
          color: '#999999'
        }
      }, axisTick: {
        show: false
      }, axisLine: {
        show: false
      }, z: 10, type: 'value',
    }, grid: {
      left: '0%', right: '8%', bottom: '8%', containLabel: true
    }, yAxis: {
      data: dataAxis, type: 'category', axisLine: {
        show: false
      }, axisTick: {
        show: false
      }, splitLine: {
        show: true
      }, axisLabel: {
        textStyle: {
          color: '#999'
        }, show: true
      }
    }, // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    dataZoom: [{
      show: true,

      height: 13, showDataShadow: true,
    }, {
      type: 'inside',

    }, {

      show: true, yAxisIndex: 0, filterMode: 'empty', width: 13, height: '80%', showDataShadow: false, left: '93%'
    }], series: [{
      type: 'bar', name: '精确率', barMaxWidth: 17, barGap: '30%', data: accuracyArr,

      itemStyle: {
        color: '#A3D0EF', borderRadius: [0, 10, 10, 0], borderWidth: 1, borderType: 'solid'
      },
    }, {
      type: 'bar', name: '召回率', barMaxWidth: 17, barGap: '30%', itemStyle: {
        color: '#5AABE2', borderRadius: [0, 10, 10, 0], borderWidth: 1, borderType: 'solid'
      }, data: recallArr,

    }, {
      type: 'bar', name: 'F1 Score', barMaxWidth: 17, barGap: '30%', itemStyle: {
        color: '#085082', borderRadius: [0, 10, 10, 0], borderWidth: 1, borderType: 'solid'
      }, data: fScoreArr,

    }]
  }
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
      data: ['精确率', '召回率', 'F1 Score'],
      show: false
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      backgroundColor: '#061926',
      borderWidth: 0,
      borderRadius: 10,
      textStyle: {
        color: '#fff'
      },
    },
    grid: {
      left: '0%',
      right: '8%',
      bottom: '8%',
      containLabel: true
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
          color: '#A3D0EF',
          borderRadius: [0, 10, 10, 0],
          borderWidth: 1,
          borderType: 'solid'
        },

      },
      {
        type: 'bar',
        name: '召回率',
        barMaxWidth: 17,
        barGap: '30%',
        itemStyle: {
          color: '#5AABE2',
          borderRadius: [0, 10, 10, 0],
          borderWidth: 1,
          borderType: 'solid'
        },

        data: recallArr
      },
      {
        type: 'bar',
        name: 'F1 Score',
        barMaxWidth: 17,
        barGap: '30%',

        itemStyle: {
          color: '#085082',
          borderRadius: [0, 10, 10, 0],
          borderWidth: 1,
          borderType: 'solid'
        },
        data: fScoreArr
      }
    ]
  };
  return option
}
