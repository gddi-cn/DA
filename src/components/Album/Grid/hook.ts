import { useAtom } from 'jotai'

import { dataListAtom } from '../store'

export const useGrid = () => {
  const [dataList] = useAtom(dataListAtom)


  return {
    dataList,
  }
}
