import { useAtom } from 'jotai'

import { useResetStore, stepAtom } from './store'
import { useAppListFetcher } from './AppSelector/hook'


export const useCreate = () => {
  useResetStore()
  useAppListFetcher()

  const [currentStep] = useAtom(stepAtom)

  return {
    currentStep,
  }
}

