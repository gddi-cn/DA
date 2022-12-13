import { useAtom } from 'jotai'

import { displayTypeAtom, dataListAtom, previewNumAtom } from './store'
import React from 'react'

export const useAlbum = (props: Album.Props) => {
  const [displayType, setDisplayType] = useAtom(displayTypeAtom)
  const [, setDataList] = useAtom(dataListAtom)
  const [, setPreviewNum] = useAtom(previewNumAtom)

  const { type, imgList, previewNum } = props

  React.useEffect(
    () => {
      setDataList(imgList)
      setDisplayType(type)
      setPreviewNum(previewNum || 6)
    },
    [type, imgList, previewNum]
  )

  return {
    displayType
  }
}
