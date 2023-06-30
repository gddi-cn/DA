import { useAtomValue } from 'jotai'
import { deployListAtom } from './store'

export const useDeployList = () => {
  const deployList = useAtomValue(deployListAtom)

  return {
    deployList,
  }
}
