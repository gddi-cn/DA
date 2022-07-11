import { isFunction } from 'lodash'
export function getOptions ({ formatter, indicatorArr, richArr, dataArr } = {

  indicatorArr: [
    { name: 1 },
    { name: 2 },
    { name: 3 },
    { name: 4 }
  ],
  richArr: {},
  dataArr: []
}) {
  const radarOption = {
    title: {},
    color: '#48A2DF',
    radar: {
      shape: 'circle',
      radius: window.innerHeight * 0.15,
      name: {
        rich: { ...richArr },
        textStyle: {
          color: '#fff',
          borderRadius: 3,
          padding: [4, 4, 4, 4]
        },
      },
      indicator: indicatorArr,
      triggerEvent: true
    },
    series: [{
      center: ['50%', '50%'],
      type: 'radar',
      areaStyle: {},
      data: [
        {
          value: dataArr,

          label: {
            show: true,
            position: 'insideRight'
          }
        }
      ]
    }]
  };

  if (isFunction(formatter)) {
    radarOption.radar.name.formatter = formatter
  }
  return radarOption
}
