import { fabric } from 'fabric'
import { CustomPolygon } from '../customFabricClass/cusPolygon'
import { CustomRect } from '../customFabricClass/cusRect'
const randomColor = require('randomcolor'); // import the script

// 初始化自定义多边形，后续反序列化的关键
fabric.CustomPolygon = CustomPolygon;
fabric.CustomPolygon.fromObject = function (object, callback) {
  callback(new fabric.CustomPolygon(object.points, object))
};

fabric.CustomRect = CustomRect;
fabric.CustomRect.fromObject = function (object, callback) {
  callback(new fabric.CustomRect(object))
};

const defaultRect = {
  strokeWidth: 1,
  objectCaching: false,
  selectable: false,
  transparentCorners: false,
  hasControls: true,
  hasBorders: false,
  lockScalingX: true,
  lockScalingY: true,
  lockMovementX: true,
  lockScalingFlip: true,
  lockMovementY: true,
  lockRotation: true,
  strokeUniform: true,
  noScaleCache: false,
}

export default function (ctx, data) {
  const {
    type, label, points,
    rectData,
    stroke,
    fill,
    line: lineData,
    circle,
  } = data;
  // const color = randomColor({
  //   seed: label,
  //   format: 'rgba',
  //   luminosity: 'bright',
  //   alpha: 1
  // })
  // const fillColorList = color.split(',')
  // fillColorList.pop();
  // fillColorList.push('0.2)')
  // const fillColor = fillColorList.join()

  if (type === 'CustomRect') {
    const [
      left,
      top,
      width,
      height,
    ] = rectData
    const rect = new CustomRect({
      left,
      top,
      width,
      height,
      ...{ label: label },
      fill: fill,
      stroke: stroke,
      ...defaultRect,

      cornerStyle: 'circle'
    });
    rect.setControlsVisibility({
      tl: false, // top-left
      mt: false, // middle-top
      tr: false, // top-right
      ml: false, // middle-left
      mr: false, // middle-right
      bl: false, // bottom-left
      mb: false, // middle-bottom
      br: false, // bottom-right
      mtr: false
    })
    // 初始化rect

    ctx.add(rect);
  }

  if (type === 'line') {
    const line = new fabric.Line(lineData, {
      stroke,
      strokeWidth:1,
      opacity: 1,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      objectCaching: false,
      transparentCorners: false,
    })
    ctx.add(line)
  }

  if (type === 'circle') {
    const c = new fabric.Circle({
      ...circle,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      objectCaching: false,
      transparentCorners: false,
    })
    ctx.add(c)
  }

  // 目前多边形和这折线还没有用的上，搞不好以后也用不上
  if (type === 'polyline') {
    const line = new fabric.Polyline(points, {
      stroke: randomColor({
        seed: label,
        format: 'rgba',
        luminosity: 'bright',
        alpha: 1
      }),
      strokeWidth: 1,
      // perPixelTargetFind: true,
      // transparentCorners: true,
      opacity: 1,
      // hasBorders: false,
      hasControls: true,
      hasBorders: true,
      // fill: 'transparent',
      selectable: false,

      objectCaching: false,
      transparentCorners: false,
      fill: 'transparent',

      ...{ label: label }
    })
    ctx.add(line)
  }

  if (type === 'CustomPolygon') {
    const polylgon = new CustomPolygon(points, {
      stroke: stroke,
      strokeWidth: 1,
      // perPixelTargetFind: true,
      // transparentCorners: true,
      opacity: 1,
      // hasBorders: false,
      hasControls: true,
      hasBorders: false,
      // fill: 'transparent',
      selectable: false,
      fill: fill,
      objectCaching: false,
      transparentCorners: false,
      // padding: 25,
      // hasFill: 'red',
      label: label
    });

    // 初始化rect

    ctx.add(polylgon);
  }
}
