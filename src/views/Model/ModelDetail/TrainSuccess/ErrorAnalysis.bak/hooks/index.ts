
import { isEmpty, isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { transformModelOutputData } from '../../utils/transformModelOutputData'

export const useGetDataInfo = (data: any, scenes: any) => {
  const [dataInfo, setDataInfo] = useState<any>({

  })

  useEffect(() => {
    if (isEmpty(data) || isNil(data)) {
      return
    }

    try {
      const iamwantyou = transformModelOutputData({
        data, modelType: scenes
      })
      setDataInfo(iamwantyou)
    } catch (e) {
      console.log(e)
    }
  }, [data, scenes])

  return dataInfo
}
