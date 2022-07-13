import { useState, useEffect } from 'react'
import { transformModelOutputData } from './transformModelOutputData'
import { isNil, isEmpty } from 'lodash'

export const useGetDataInfo = (data: any, scenes: any) => {
  const [dataInfo, setDataInfo] = useState<any>({

  })

  useEffect(() => {
    if (isEmpty(data) || isNil(data)) {
      return
    }

    const iamwantyou = transformModelOutputData({ modelType: scenes, data })
    setDataInfo(iamwantyou)
  }, [data, scenes])

  return dataInfo
}
