import { isEmpty, isArray } from 'lodash';

const randomColor = require('randomcolor');

const transformColor = (color: string, alpha: number) => {
  return color.trim().replace(/\s{0,}\d{0,}\.{0,}\d{0,}\)$/, alpha + ')')
}

export const transformModelOutputData = (
  {
    data, modelType
  }: {
      data:any,
      modelType:string
  }
) :any => {
  let dataSet: any = []

  if (modelType === 'classify') {
    const first = data[0]
    if (isArray(first)) {
      dataSet = (data as any)?.map((dso: any) => {
        const [label, , , , , acc] = dso

        const color = randomColor({
          luminosity: 'bright',
          format: 'rgba',
          alpha: 1, // e.g. 'rgba(9, 1, 107, 0.5)',
          seed: label
        })
        // console.warn(colorMap)
        return {
          fill: transformColor(color, 0.25), // 迷一样
          stroke: color,

          label: label + ':' + acc
        }
      });
    } else {
      dataSet = ([data] as any)?.map((dso: any) => {
        const [label, acc] = dso

        const color = randomColor({
          luminosity: 'bright',
          format: 'rgba',
          alpha: 1, // e.g. 'rgba(9, 1, 107, 0.5)',
          seed: label
        })
        // console.warn(colorMap)
        return {
          fill: transformColor(color, 0.25), // 迷一样
          stroke: color,

          label: label + ':' + acc
        }
      });
    }

    return {
      dataSet
    }
  }

  if (modelType === 'monocular_3d_detection') {
    for (let s = 0; s < data.length; s++) {
      const { positions, label, score } = data[s]
      // const absolutionPoints = positions?.map((o: any) => {
      //   const [p1, p2] = o

      //   return {
      //     x: p1 * width, y: p2 * height
      //   }
      // })
      if (isEmpty(positions)) {
        continue
      }

      const absolutionPoints = positions?.map((o: any) => {
        const [p1, p2] = o

        return {
          x: p1, y: p2
        }
      })
      // 绝对坐标的8个点
      const [tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8] = absolutionPoints

      // 算法那边定的面的顺序
      const tsurfaces = [
        [tp1, tp2, tp3, tp4], // bottom
        [tp7, tp6, tp2, tp3], // font
        [tp7, tp8, tp4, tp3], // right
        [tp8, tp5, tp1, tp4], // end
        [tp8, tp5, tp6, tp7], // top
        [tp6, tp5, tp1, tp2], // left
      ]

      const color = randomColor({
        seed: label,
        format: 'rgba',
        luminosity: 'bright',
        alpha: 1
      })
      for (let i = 0; i < tsurfaces.length; i++) {
        const nData: any = {
          fill: transformColor(color, 0.15), // 迷一样
          stroke: color,
          // x y w h
          points: tsurfaces[i],
          // labelText: label + (persent === undefined ? '' : '-' + persent)

          type: 'CustomPolygon'
        }
        if (i === 3) {
          nData.label = label + '：' + score
        }

        dataSet.push(
          nData
        )
      }
    }

    return {
      dataSet
    }
  }

  // 默认
  dataSet = (data as any)?.map((dso: any) => {
    const [label, x, y, x1, y1, acc] = dso
    // console.warn(colorMap)
    const color = randomColor({
      luminosity: 'bright',
      format: 'rgba',
      alpha: 1, // e.g. 'rgba(9, 1, 107, 0.5)',
      seed: label
    })
    return {
      fill: transformColor(color, 0.25), // 迷一样
      stroke: color,
      rectData: [x, y, x1 - x, y1 - y],
      label: label + ' : ' + acc,
      type: 'CustomRect'
    }
  });

  return {
    dataSet
  }
}
