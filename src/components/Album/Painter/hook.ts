import React from 'react'

export const usePainter = (props: Album.ImgMeta) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [src, setSrc] = React.useState<string>(props.src)

  const onClose = () => setOpen(false)
  const onClick = () => setOpen(true)

  return {
    open,
    onClick,
    onClose,
    rawSrc: props.rawSrc || src,
    src,
  }
}
