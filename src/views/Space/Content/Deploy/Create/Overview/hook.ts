import { Space } from "@src/views/Space/enums"
import { useAtom } from "jotai"
import { currentPageAtom } from "../../store"
import { stepAtom } from "../store"

export const useOverview = () => {
  const [, setStep] = useAtom(stepAtom) 
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleCancel = () => {
    setCurrentPage(Space.Deploy.Page.LIST)
  }

  const handlePre = () => {
    setStep(Space.Deploy.Create.Step.DEVICE)
  }

  const handleDeploy = () => {

  }

  const handleExport = () => {

  }

  return {
    handleCancel,
    handlePre,
    handleDeploy,
    handleExport,
  }
}

