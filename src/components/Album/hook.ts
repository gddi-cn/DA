import { useAtom } from 'jotai'

import { displayTypeAtom, dataListAtom  } from './store'
import React from 'react'

export const useAlbum = (props: Album.Props) => {
  const [displayType, setDisplayType] = useAtom(displayTypeAtom)
  const [, setDataList] = useAtom(dataListAtom)

  const { type, imgList } = props

  React.useEffect(
    () => {
      setDataList(imgList)
      setDisplayType(type)
    },
    [type, imgList]
  )

  return {
    displayType
  }
}
