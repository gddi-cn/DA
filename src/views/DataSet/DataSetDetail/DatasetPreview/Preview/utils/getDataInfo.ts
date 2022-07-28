
import empty from '@src/asset/images/empty.png'
import { isEmpty, isNil } from 'lodash';
import { useEffect, useState } from 'react';
const randomColor = require('randomcolor');

const transformColor = (color:string, alpha:number) => {
  return color.trim().replace(/\s{0,}\d{0,}\.{0,}\d{0,}\)$/, alpha + ')')
}

// cityscapes_segment: '通用分割',
//   portrait_segment: '肖像分割',

// thumbnailUrl: '',
//   url: '',
//     dataSet: [],
//       rawImgDataSet: [],
//         width: 0,
//           height: 0

export const processData = (data: any, scenes: any) => {
  let iamwantyou: any = {}
  let dataSet: any = []
  let rawImgDataSet: any = []
  const { position, thumbnail_width: tw, thumbnail_height: th, thumbnail, url, width, height, annotations = [] } = data

  if ((scenes as string).includes('segment') || scenes === 'pose_detection') {
    if (position) {
      const first = position[0]
      const { position: ps } = first
      const { render } = JSON.parse(ps)
      iamwantyou = {
        thumbnailUrl: render || url,
        url: render || url,
        dataSet: [],
        rawImgDataSet: []
      }
    } else {
      iamwantyou = {
        thumbnailUrl: url,
        url: url,
        dataSet: [],
        rawImgDataSet: []
      }
    }

    return iamwantyou
  }

  if (scenes === 'monocular_3d_detection') {
    position?.map((dso: any) => {
      const { position } = dso
      const label = dso.class
      // 返回的数据有点迷惑性
      const percnetPoints = JSON.parse(position).position
      const absolutionPoints = percnetPoints?.map((o: any) => {
        const [p1, p2] = o

        return {
          x: p1 * width, y: p2 * height
        }
      })

      const thumbnailAbsolutionPoints = percnetPoints?.map((o: any) => {
        const [p1, p2] = o
        return {
          x: p1 * tw, y: p2 * th
        }
      })
      // 绝对坐标的8个点
      const [p1, p2, p3, p4, p5, p6, p7, p8] = absolutionPoints
      // 算法那边定的面的顺序
      const surfaces = [
        [p1, p2, p3, p4], // bottom
        [p7, p6, p2, p3], // font
        [p7, p8, p4, p3], // right
        [p8, p5, p1, p4], // end
        [p8, p5, p6, p7], // top
        [p6, p5, p1, p2], // left
      ]

      // 绝对坐标的8个点
      const [tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8] = thumbnailAbsolutionPoints
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

      for (let i = 0; i < surfaces.length; i++) {
        const rData: any = {
          fill: transformColor(color, 0.15), // 迷一样
          stroke: color,
          // x y w h
          points: surfaces[i],
          // labelText: label + (persent === undefined ? '' : '-' + persent)

          type: 'CustomPolygon'
        }

        const nData: any = {
          fill: transformColor(color, 0.15), // 迷一样
          stroke: color,
          // x y w h
          points: tsurfaces[i],
          // labelText: label + (persent === undefined ? '' : '-' + persent)

          type: 'CustomPolygon'
        }
        if (i === 3) {
          rData.label = label
          nData.label = label
        }
        rawImgDataSet.push(
          rData
        )
        dataSet.push(
          nData
        )
      }

      return ''
    })
  }

  if (scenes === 'detection') {
    for (let i = 0; i < annotations.length; i++) {
      const { position = [], class: label } = annotations[i]
      const color = randomColor({
        seed: label,
        format: 'rgba',
        luminosity: 'bright',
        alpha: 1
      })
      for (let j = 0; j < position.length; j++) {
        const [x, y, w, h] = position[j]
        rawImgDataSet.push({
          fill: transformColor(color, 0.35), // 迷一样
          stroke: color,
          // x y w h
          rectData: [x * width, y * height, w * width - x * width, h * height - y * height],
          // labelText: label + (persent === undefined ? '' : '-' + persent)
          label: label,
          type: 'CustomRect'
        })

        dataSet.push({
          fill: transformColor(color, 0.35), // 迷一样
          stroke: color,
          rectData: [x * tw, y * th, w * tw - x * tw, h * th - y * th],
          // labelText: label + (persent === undefined ? '' : '-' + persent)
          label: label,
          type: 'CustomRect'
        })
      }
    }
    // rawImgDataSet = annotations?.map((dso: any) => {
    //   const { position, class: label } = dso

    //   const [x, y, w, h] = JSON.parse(position)
    //   // console.warn(colorMap)
    //   const color = randomColor({
    //     seed: label,
    //     format: 'rgba',
    //     luminosity: 'bright',
    //     alpha: 1
    //   })
    //   return {
    //     fill: transformColor(color, 0.35), // 迷一样
    //     stroke: color,
    //     // x y w h
    //     rectData: [x * width, y * height, w * width - x * width, h * height - y * height],
    //     // labelText: label + (persent === undefined ? '' : '-' + persent)
    //     label: label,
    //     type: 'CustomRect'
    //   }
    // })
    // dataSet = annotations?.map((dso: any) => {
    //   const { position } = dso
    //   const label = dso.class
    //   const [x, y, w, h] = JSON.parse(position)
    //   const color = randomColor({
    //     seed: label,
    //     format: 'rgba',
    //     luminosity: 'bright',
    //     alpha: 1
    //   })
    //   return {
    //     fill: transformColor(color, 0.35), // 迷一样
    //     stroke: color,
    //     rectData: [x * tw, y * th, w * tw - x * tw, h * th - y * th],
    //     // labelText: label + (persent === undefined ? '' : '-' + persent)
    //     label: label,
    //     type: 'CustomRect'
    //   }
    // })
  }

  if (scenes === 'classify') {
    dataSet = position?.map((dso: any) => {
      const label = dso.class
      const color = randomColor({
        seed: label,
        format: 'rgba',
        luminosity: 'bright',
        alpha: 1
      })
      // console.warn(colorMap)
      return {
        fill: transformColor(color, 0.35),
        stroke: color,

        // labelText: label + (persent === undefined ? '' : '-' + persent)
        label: label
      }
    })

    rawImgDataSet = position?.map((dso: any) => {
      const label = dso.class
      const color = randomColor({
        seed: label,
        format: 'rgba',
        luminosity: 'bright',
        alpha: 1
      })
      // console.warn(colorMap)
      return {
        fill: transformColor(color, 0.35),
        stroke: color,

        // labelText: label + (persent === undefined ? '' : '-' + persent)
        label: label
      }
    })
  }

  const getUrl = () => {
    if (scenes !== 'classify' && scenes !== 'detection' && scenes !== 'monocular_3d_detection') {
      return position
    } else {
      return url
    }
  }

  const getthumbnail = () => {
    if (scenes !== 'classify' && scenes !== 'detection' && scenes !== 'monocular_3d_detection') {
      return position
    } else {
      return thumbnail || empty
    }
  }

  iamwantyou = {
    thumbnailUrl: getthumbnail(),
    url: getUrl(),
    dataSet,
    rawImgDataSet,
    width,
    height
  }

  return iamwantyou
}

export const useGetDataInfo = (data: any, scenes:any) => {
  const [dataInfo, setDataInfo] = useState<any>({

  })

  useEffect(() => {
    try {
      if (isEmpty(data) || isNil(data)) {
        return
      }

      const iamwantyou = processData(data, scenes)

      setDataInfo(iamwantyou)
    } catch (e) {
      console.log(e)
    }
  }, [data, scenes])

  return dataInfo
}
