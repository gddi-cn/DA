import { useAtom } from 'jotai'
import { currentDatasetAtom } from '../../../store'
import { classListAtom, showClassListAtom } from '../store'

export const useTableBody = () => {
  const [classList] = useAtom(classListAtom)
  const [showClassList] = useAtom(showClassListAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)

  const total = classList.length


  return {
    showClassList,
    datasetInfo,
    total,
  }
}

