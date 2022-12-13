import randomColor from 'randomcolor'

const getColorByLabel = (label: string): Album.Color => randomColor({
  seed: label,
  format: 'rgbArray',
  luminosity: 'bright'
}) as any

export const drawBox = (
  ctx: CanvasRenderingContext2D,
  box: Album.Box,
  scale: number,
  color: Album.Color,
  fill = false,
) => {
  const [r, g, b] = color
  const { leftTop: { x: sx, y: sy }, rightBottom: { x: ex, y: ey } } = box
  const x = sx * scale
  const y = sy * scale

  const width = (ex - sx) * scale
  const height = (ey - sy) * scale

  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`
  ctx.lineWidth = 2

  if (fill) {
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`
    ctx.fillRect(x, y, width, height)
  }

  ctx.strokeRect(x, y, width, height)
}

// 检测框
export const drawBBox = (ctx: CanvasRenderingContext2D, bBox: Album.BBox, scale: number) => {
  const px = 6
  const py = 4
  const { label, leftTop: { x: sx, y: sy }, leftTop, rightBottom: { x: ex, y: ey }, rightBottom, prob, fill } = bBox

  const x = sx * scale
  const y = sy * scale

  const width = (ex - sx) * scale
  const height = (ey - sy) * scale

  const [r, g, b] = getColorByLabel(label)

  const { width: imageWidth, height: imageHeight } = ctx.canvas

  const fontSize = Math.max(14 / scale, Math.ceil(38 * imageHeight / 1080))

  ctx.font = `${fontSize}px Arial`
  const text = `${label}: ${prob}`
  const textWidth = Math.ceil(ctx.measureText(text).width)

  const label_width = textWidth + px * 2
  const label_height = fontSize + py * 2

  const is_left = x + textWidth + 2 * px < imageWidth
  // const is_left = true
  const is_top = y > fontSize + 2 * py

  const label_top = is_top ? y - fontSize - 2 * py : y + height
  const label_left = is_left ? x : x + width - label_width + (is_left ? -2 : 2)

  const text_top = label_top + py + fontSize * 0.8
  const text_left = label_left + px + (is_left ? 0 : textWidth)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  drawBox(ctx, { leftTop, rightBottom, prob }, scale, [r, g, b], fill)

  // 绘制文字背景
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
  ctx.fillRect(label_left, label_top, label_width, label_height)

  // 绘制文字
  ctx.textAlign = is_left ? 'left' : 'right'
  ctx.fillStyle = brightness > 128 ? '#000' : '#fff'
  ctx.fillText(text, text_left, text_top)
  ctx.lineWidth = 1
  ctx.strokeStyle = brightness > 128 ? '#fff' : '#000'
  ctx.strokeText(text, text_left, text_top)
}

// 分类标签
export const drawClassLabel = (ctx: CanvasRenderingContext2D, classLabel: Album.ClassLabel) => {
  const px = 12
  const py = 8
  const {  label, prob } = classLabel

  const [r, g, b]: [number, number, number] = randomColor({
    seed: label,
    format: 'rgbArray',
    luminosity: 'bright'
  }) as any

  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  const { height: imageHeight } = ctx.canvas
  const { height: sh } = ctx.canvas.getBoundingClientRect()

  const scale = sh / imageHeight

  const fontSize = Math.max(16 / scale, Math.ceil(38 * imageHeight / 1080))

  ctx.font = `${fontSize}px Arial`
  const text = `${label}: ${prob}`
  const textWidth = Math.ceil(ctx.measureText(text).width)

  const label_width = textWidth + px * 2
  const label_height = fontSize + py * 2
  const label_top = 12
  const label_left = 8
  const text_top = label_top + py + fontSize * 0.8
  const text_left = label_left + px


  // 绘制文字背景
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`
  ctx.strokeRect(label_left, label_top, label_width, label_height)
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
  ctx.fillRect(label_left, label_top, label_width, label_height)

  // 绘制文字
  ctx.textAlign = 'left'
  ctx.fillStyle = brightness > 128 ? '#000' : '#fff'
  ctx.fillText(text, text_left, text_top)
  ctx.lineWidth = 1
  ctx.strokeStyle = brightness > 128 ? '#fff' : '#000'
  ctx.strokeText(text, text_left, text_top)
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  line: Album.Line,
  scale: number,
) => {
  const { start, end, show, color: [r, g, b], width } = line

  const lineWidth = width || 1

  if (!show) return

  const { x: _sx, y: _sy } = start
  const { x: _ex, y: _ey } = end

  const sx = _sx * scale
  const sy = _sy * scale
  const ex = _ex * scale
  const ey = _ey * scale

  const color = `rgba(${r}, ${g}, ${b}, 1)`

  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(sx, sy, lineWidth * 2, 0, 5 * Math.PI);
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(ex, ey, lineWidth * 2, 0, 2 * Math.PI);
  ctx.fill()
  ctx.closePath()

  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke()
  ctx.closePath();
}
