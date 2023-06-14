import { useSetAtom } from "jotai"
import { currentStepAtom } from "./store"
import { Deploy } from "./enums"

export const useToApp = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)

  return () => {
    setCurrentStep(Deploy.Step.APP)
  }
}

export const useToDevice = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)

  return () => {
    setCurrentStep(Deploy.Step.DEVICE)
  }
}

export const useToOverview = () => {
  const setCurrentStep = useSetAtom(currentStepAtom)

  return () => {
    setCurrentStep(Deploy.Step.OVERVIEW)
  }
}