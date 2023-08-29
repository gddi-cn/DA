import React from 'react'
import { Box, IconButton, Modal } from '@mui/material'
import ZoomArea from '../ZoomArea/ZoomArea'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'

const Img = styled.img<{ aspectRatio?: number }>`
  width: 100%;
  aspect-ratio: ${(props) => props.aspectRatio};
  object-fit: cover;
  display: block;
`

const BigImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`

interface ImgPreviewProps {
  img: File
  Fallback?: React.ReactElement
  aspectRatio?: number
}

export const ImgPreview: React.FC<ImgPreviewProps> = (
  {
    img,
    Fallback,
    aspectRatio,
  }
) => {
  const [url, setUrl] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(
    () => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUrl(e.target?.result as string)
      }
      reader.readAsDataURL(img)

      return () => {
        reader.onload = null
        url && URL.revokeObjectURL(url)
      }
    },
    [img]
  )

  if (!url && Fallback)
    return Fallback

  return (
    <Box sx={{ cursor: 'zoom-in', overflow: 'hidden', lineHeight: 1 }} onClick={() => setOpen(true)}>
      <Img aspectRatio={aspectRatio} src={url || undefined} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <ZoomArea>
            <BigImg src={url || undefined} />
          </ZoomArea>
          <Box sx={{ position: 'absolute', top: 1, right: 1 }}>
            <IconButton
              size='large'
              color='secondary'
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='large' />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ImgPreview

