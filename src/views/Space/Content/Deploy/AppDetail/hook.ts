import { Space } from '@src/views/Space/enums'
import { useAtom } from 'jotai'
import { currentAppIdAtom, currentPageAtom } from '../store'

export const useAppDetail = () => {
  const [appId] = useAtom(currentAppIdAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleClose = () => {
    setCurrentPage(Space.Deploy.Page.DETAIL)
  }

  return {
    appId,
    handleClose,
  }
}
