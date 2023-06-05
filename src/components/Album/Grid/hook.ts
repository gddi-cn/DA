import produce from 'immer'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { v4 } from 'uuid'

import { dataListAtom } from '../store'

export const useGrid = () => {
  const rawData = useAtomValue(dataListAtom)
  const [key, setKey] = React.useState<string>('')
  const [data, setData] =
    React.useState<Array<Painter.ImgMeta | null>>([])

  React.useEffect(() => {
    setKey(v4())
    setData(new Array(rawData.length).fill(null))
  }, [rawData])

  const isItemLoaded = (idx: number) => idx < data.length && data[idx] !== null

  const loadMoreItems = async (start: number, end: number) => {
      const newData = [...data]
      for (let idx = start; idx <= end; idx++) {
        newData[idx] = rawData[idx]
      }
      setData(newData);

      return
  }

  return {
    key,
    data,
    isItemLoaded,
    loadMoreItems,
  }
}
