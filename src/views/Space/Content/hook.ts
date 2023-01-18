import { useAtom } from "jotai"
import { Space } from "../enums"
import { currentPageAtom } from "../store"

export const useContent = () => {
  const [currentPage] = useAtom(currentPageAtom)

  const showUsage = currentPage === Space.Page.USAGE

  const showAccount = currentPage === Space.Page.ACCOUNT

  const showDevice = currentPage === Space.Page.DEVICE

  return {
    showUsage,
    showAccount,
    showDevice,
  }
}