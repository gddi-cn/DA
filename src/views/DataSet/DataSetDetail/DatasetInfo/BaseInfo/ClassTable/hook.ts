import { useAtom } from 'jotai'
import { currentDatasetAtom } from '../../../store'
import { classPageAtom, hasMoreAtom, showClassListAtom } from '../store'

export const useTableBody = () => {
  const [showClassList] = useAtom(showClassListAtom)
  const [datasetInfo] = useAtom(currentDatasetAtom)
  const [hasMore] = useAtom(hasMoreAtom)
  const [, setPage] = useAtom(classPageAtom)

  const loadMore = () => {
    setPage(page => page + 1)
  }

  return {
    showClassList,
    datasetInfo,
    hasMore,
    loadMore,
  }
}

