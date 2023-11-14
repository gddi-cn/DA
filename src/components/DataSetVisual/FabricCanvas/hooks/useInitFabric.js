import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { isEmpty } from 'lodash'

import drawData from './drawData'

// 禁止一切操作
const disableAnyFuck = (ctx) => {
  // ctx.skipTargetFind = true
  ctx.selection = false
}

// 开启拖拽+缩放
const setDropAndScale = (ctx) => {
  ctx.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY;
    let zoom = ctx.getZoom();
    // console.warn(0.999 ** delta, 'zoomzoom')
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    // ctx.setZoom(zoom);
    ctx.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })

  ctx.on('mouse:down', (opt) => {
    const evt = opt.e;
    // if (evt.altKey === true) {

    // }
    ctx.isDragging = true;
    ctx.selection = false;
    ctx.lastPosX = evt.clientX;
    ctx.lastPosY = evt.clientY;
  });

  ctx.on('mouse:move', (opt) => {
    if (ctx.isDragging) {
      const e = opt.e;
      const vpt = ctx.viewportTransform;
      vpt[4] += e.clientX - ctx.lastPosX;
      vpt[5] += e.clientY - ctx.lastPosY;
      ctx.requestRenderAll();
      ctx.lastPosX = e.clientX;
      ctx.lastPosY = e.clientY;
    }
  });

  ctx.on('mouse:up', () => {
    ctx.setViewportTransform(ctx.viewportTransform); // 得记录下来，画东西得转回来fuck
    ctx.isDragging = false;
    ctx.selection = true;
  });
}

export const useInitFabric = ({ canvasEle, url, canvasContainer, canvasData, zoom = true, masks }) => {
  const fbIns = useRef(null)
  const [imgIns, setImgIns] = useState(null)

  useEffect(() => {
    if (canvasEle.current && canvasContainer.current && url) {
      const image = new Image()
      // image.setAttribute('crossOrigin', 'anonymous');
      image.src = url

      image.onload = function () {
        setImgIns(this)
      }
    }
  }, [canvasContainer, canvasEle, url])

  useEffect(
    () => {
      if (!imgIns) {
        return
      }
      if (canvasEle.current && canvasContainer.current && url) {
        if (!canvasEle.current && !canvasContainer.current) {
          return
        }

        if (zoom && fbIns.current === null) {
          fbIns.current = new fabric.Canvas(canvasEle.current)
        } else {
          fbIns.current = new fabric.StaticCanvas(canvasEle.current)
        }

        const width = (imgIns).naturalWidth;

        const height = (imgIns).naturalHeight

        fbIns.current.setBackgroundImage(
          url,
          fbIns.current.renderAll.bind(fbIns.current),
          {
            width,
            height,
            // originX: 'center',
            // originY: 'top'
          }
        )

        // 设置遮罩 (热力图等）
        if (masks?.length) {
          masks?.forEach(mask => {
            fabric.Image.fromURL(mask, (img) => {
                img.set({
                    left: 0,
                    top: 0,
                    width,
                    height,
                    scaleX: 1,
                    scaleY: 1,
                    selectable: false,
                    evented: false,
                    hasControls: false,
                    hasBorders: false,
                    crossOrigin: 'anonymous',
                })
                fbIns.current?.add(img)
            })
          })
        }

        // 设置画布宽高
        fbIns.current.setWidth((canvasContainer.current).offsetWidth).setHeight((canvasContainer.current).offsetHeight)
        // 设置矩阵适应画布大小,如果图片超级大
        const matrix = fbIns.current.viewportTransform
        // 先直接 看看直接设定宽度为容器宽度
        matrix[0] = (canvasContainer.current).offsetWidth / (imgIns).naturalWidth;
        matrix[3] = (canvasContainer.current).offsetWidth / (imgIns).naturalWidth;
        // if ((canvasContainer.current).offsetWidth < (this).naturalWidth) {
        //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        // }

        const tran = matrix[0]
        // 如果此时图高度比容器大，就继续转一手高度为最大，宽度忽略
        if ((imgIns).naturalHeight * tran > (canvasContainer.current).offsetHeight) {
          matrix[0] = (canvasContainer.current).offsetHeight / ((imgIns).naturalHeight * tran) * tran;
          matrix[3] = (canvasContainer.current).offsetHeight / ((imgIns).naturalHeight * tran) * tran;
        }

        // if ((canvasContainer.current).offsetWidth > (this).naturalWidth) {
        //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
        // }

        // 缩放后剧中显示，估计大佬也要求这玩意
        const _tran = matrix[3]
        const _width = (imgIns).naturalWidth * _tran;
        const _height = (imgIns).naturalHeight * _tran;
        const tranX = ((canvasContainer.current).offsetWidth - _width) / 2
        const tranY = ((canvasContainer.current).offsetHeight - _height) / 2
        matrix[4] = tranX
        matrix[5] = tranY
        fbIns.current.viewportTransform = matrix

        // 然而实际上后端返回的啥我也暂时不清楚，有毒
        if (canvasData && !isEmpty(canvasData)) {
          for (const o of canvasData) {
            drawData(fbIns.current, o)
          }
        }
        fbIns.current.renderAll();
        if (zoom) {
          // const myCtx = new Fb(fbctx)
          disableAnyFuck(fbIns.current)
          setDropAndScale(fbIns.current)
        }
      }

      return () => {
        if (fbIns.current?.dispose) {
          // fbIns.current.dispose()
        }
        fbIns.current = null
      }
    }, [canvasContainer, canvasData, canvasEle, url, zoom, imgIns]
  )
}
