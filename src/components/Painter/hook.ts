import React from "react";

import { drawBBox, drawClassLabel, drawLine, drawCircle } from "./utils";

const WIDTH = 1920;
const HEIGHT = 1080;

const loadImg = async (url: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const $img = new Image();
    $img.crossOrigin = "anonymous";

    $img.src = url;

    $img.onload = () => {
      res($img);
    };

    $img.onerror = (e) => {
      rej(e);
    };
  });

const compositionImage = async (
  ctx: CanvasRenderingContext2D,
  meta: Painter.ImgMeta,
  raw = false
) => {
  const { src, bBoxes, rawSrc, classLabel, lines, circles } = meta;

  try {
    const $img = await loadImg(raw ? rawSrc || src : src);
    const { naturalWidth, naturalHeight } = $img;

    const radio = naturalWidth / naturalHeight;

    if (radio >= WIDTH / HEIGHT) {
      ctx.canvas.width = WIDTH;
      ctx.canvas.height = Math.round(WIDTH / radio);
    } else {
      ctx.canvas.width = Math.round(HEIGHT * radio);
      ctx.canvas.height = HEIGHT;
    }

    const scale = ctx.canvas.width / naturalWidth;

    ctx.drawImage($img, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // const scale = 1
    // ctx.canvas.width = naturalWidth
    // ctx.canvas.height = naturalHeight
    // ctx.drawImage($img, 0, 0)

    if (raw && rawSrc) return;

    // 检测框
    bBoxes?.forEach((bBox) => drawBBox(ctx, bBox, scale));

    // 分类标签
    classLabel && drawClassLabel(ctx, classLabel);

    // 画线条
    lines?.forEach((line) => drawLine(ctx, line, scale));

    // 画点
    circles?.forEach(circle => drawCircle(ctx, circle, scale))
  } catch (e) {
    console.error(e);
  }
};

export const usePainter = (props: Painter.ImgMeta) => {
  const rawCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const resultCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [rawLoading, setRawLoading] = React.useState<boolean>(false);
  const [resLoading, setResLoading] = React.useState<boolean>(false);

  const onClose = () => setOpen(false);

  const onClick = () => setOpen(true);

  React.useEffect(() => {
    const $c = rawCanvasRef.current;
    if (!$c) return;

    const ctx = $c.getContext("2d");

    if (!ctx) {
      return console.error("Cannot create canvas rendering context");
    }

    setRawLoading(true);
    compositionImage(ctx, props, true).then(() => {
      setRawLoading(false);
    });
  }, [props.src]);

  React.useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      const $c = resultCanvasRef.current;
      if (!$c) return;

      const ctx = $c.getContext("2d");

      if (!ctx) {
        return console.error("Cannot create canvas rendering context");
      }

      setResLoading(true);
      compositionImage(ctx, props).then(() => {
        setResLoading(false);
      });
    });
  }, [props.src, open]);

  return {
    open,
    onClick,
    onClose,
    rawCanvasRef,
    resultCanvasRef,
    rawLoading,
    resLoading,
  };
};
